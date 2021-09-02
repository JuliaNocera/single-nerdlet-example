import React from 'react';

import { BlockText, HeadingText, Layout, LayoutItem, navigation, NerdGraphQuery, ngql, Spinner, Tile, TileGroup } from 'nr1'

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

const CATALOG_QUERY = ngql`
{
  actor {
    nr1Catalog {
      nerdpacks {
        id
        metadata {
          displayName
          tagline
        }
        visibility
      }
    }
  }
}
`

export default class DemoCatalogHomeNerdlet extends React.Component {
  render() {
    return (
      <Layout className="DemoCatalog">
        <LayoutItem>
        <NerdGraphQuery query={CATALOG_QUERY}>
          {({loading, error, data }) => {
            if(loading) {
              return <Spinner />
            }
            if (error) {
              return (
                <BlockText
                  type={BlockText.TYPE.PARAGRAPH}
                  spacingType={BlockText.SPACING_TYPE.EXTRA_LARGE}
                >
                  {error}
                </BlockText>
              );
            }
            const companyBuiltNerdpacks = data?.actor?.nr1Catalog?.nerdpacks.filter(({visibility}) => visibility === 'OWNER_AND_ALLOWED')
            if(companyBuiltNerdpacks.length === 0) {
              return <HeadingText type={HeadingText.TYPE.HEADING_3}>No Nerdpacks found</HeadingText>
            }
            return (
              <TileGroup tileWidth="3fr">
                {companyBuiltNerdpacks.map(({ id, metadata }) => (
                  <Tile
                    key={id}
                    sizeType={Tile.SIZE_TYPE.MEDIUM}
                    onClick={() =>
                      navigation.openStackedNerdlet({
                        id: "catalog.home",
                        urlState: {
                          activeView: "details",
                          packageId: id,
                        },
                      })
                    }
                  >
                    <HeadingText type={HeadingText.TYPE.HEADING_6}>
                      {metadata.displayName === id
                        ? "no display name"
                        : metadata?.displayName}
                    </HeadingText>
                    <BlockText>{metadata.tagline}</BlockText>
                  </Tile>
                ))}
              </TileGroup>
            );
            return <div></div>
          }}
        </NerdGraphQuery>
        </LayoutItem>
      </Layout>
    )
  }
}
