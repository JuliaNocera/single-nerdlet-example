import React from 'react';
import {BlockText, HeadingText, Layout, LayoutItem, Spacing} from 'nr1'

import NavBar from '../../src/NavBar'

export default class HomeNerdlet extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <LayoutItem>
            <NavBar />
          </LayoutItem>
        </Layout>
        <Layout fullHeight>
          <LayoutItem>
            <HeadingText style={{textAlign: 'center'}}>This is nerdlet "FOUR" </HeadingText>
            <Spacing type={[Spacing.TYPE.MEDIUM]}>
              <BlockText style={{textAlign: 'center'}}>
                This nerdlet is in a different repo then the three other ones associated with the "one", "two" and "three" buttons
            </BlockText>
            </Spacing>
          </LayoutItem>
        </Layout>
      </>
    )
  }
}

