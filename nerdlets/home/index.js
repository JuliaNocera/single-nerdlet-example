import React from 'react';
import {BlockText, HeadingText, Layout, LayoutItem, Link, Spacing} from 'nr1'

import Header from '../../src/Header'
import NavBar from '../../src/NavBar'

export default class HomeNerdlet extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <LayoutItem>
            <Header />
            <NavBar />
          </LayoutItem>
        </Layout>
        <Layout fullHeight>
          <LayoutItem>
            <HeadingText style={{textAlign: 'center'}}>This nerdlet shows up when "Four" is clicked</HeadingText>

            <Spacing type={[Spacing.TYPE.MEDIUM]}>
              <BlockText style={{textAlign: 'center'}}>
                This nerdlet is in a different repo then the three other ones associated with the "one", "two" and "three" buttons.
            </BlockText>
            </Spacing>
            <Spacing type={[Spacing.TYPE.MEDIUM]}>
              <div style={{textAlign: 'center'}}>
                <Link to="https://github.com/JuliaNocera/single-nerdlet-example/tree/main/nerdlets/home">Nerdlet and repo location</Link>
              </div>
            </Spacing>
          </LayoutItem>
        </Layout>
      </>
    )
  }
}

