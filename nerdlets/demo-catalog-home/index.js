import React from 'react';

import {
  BlockText,
  HeadingText,
  Layout,
  LayoutItem,
  navigation,
  NerdGraphQuery,
  ngql,
  Spinner,
  Tile,
  TileGroup,
} from "nr1";

/* 
You can explore what else is available on the `nr1Catalog > nerdpacks > metadata` 
field to add more information to your tiles if you want. 

NerdGraph GraphiQL API explorer with below query as starter:
https://api.newrelic.com/graphiql?#query=%7B%0A%20%20actor%20%7B%0A%20%20%20%20nr1Catalog%20%7B%0A%20%20%20%20%20%20nerdpacks%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20metadata%20%7B%0A%20%20%20%20%20%20%20%20%20%20tagline%0A%20%20%20%20%20%20%20%20%20%20displayName%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20visibility%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
*/
const CATALOG_QUERY = ngql`
{
  actor {
    nr1Catalog {
      nerdpacks {
        id
        metadata {
          tagline
          displayName
        }
        visibility
      }
    }
  }
}
`


/*
Nerdpacks that are globally available (Public) have a `visibility` of `GLOBAL`. 
Nerdpacks that are published only to your accounts have a `visibility` of `OWNER_AND_ALLOWED`.
*/
const COMPANY_CREATED_NERDPACK_VISIBILIY = "OWNER_AND_ALLOWED" 

/*
  This is a super simple version of the New Relic One catalog. 
  An immediate improvement I'd make would be to add a search bar
  at the top and be able to filter down the packs based on the search.
*/
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

            const companyBuiltNerdpacks =
              data?.actor?.nr1Catalog?.nerdpacks.filter(
                ({ visibility }) => visibility === COMPANY_CREATED_NERDPACK_VISIBILIY
              );

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
                          activeView: "details", // This tells the catalog nerdlet which screen to show: "details" or "account-list"
                          packageId: id,  // This tells the catalog nerdlet which Nerdpack it should show
                          hideHeader: true // This hides the breaadcrumb in the catalog nerdlet so users can't click the breadcrumb to go the main catalog.
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
          }}
        </NerdGraphQuery>
        </LayoutItem>
      </Layout>
    )
  }
}
