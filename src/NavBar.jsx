import React from 'react'
import {Button, Card, CardBody, Grid, GridItem, navigation, NerdletStateContext} from 'nr1'

const MULTIPLE_NERDLETS_EXAMPLE_NERDPACK_ID = 'fc77f0b9-bc6b-4674-90f9-fc01ec65a060'
const SINGLE_NERDLET_EXAMPLE_NERDPACK_ID = '4e3c0781-244b-4430-9a09-8522fca863a0'

export default class NavBar extends React.Component {
  isCurrentView = (nerdletState, value) => {
    if (!nerdletState && value === 'ONE') {
      return true
    }

    const isCurrentView = nerdletState.currentView === value
    return isCurrentView
  }

  buildNerdletForNavigation = (stateToPass) => {

    const {iceCream, currentView} = stateToPass
    let nerdletForNavigation = {}

    switch (currentView) {
      case 'ONE':
        nerdletForNavigation = {
          id: `${MULTIPLE_NERDLETS_EXAMPLE_NERDPACK_ID}.home`,
          urlState: {
            iceCream,
            currentView
          }
        }
        return nerdletForNavigation
      case 'TWO':
        nerdletForNavigation = {
          id: `${MULTIPLE_NERDLETS_EXAMPLE_NERDPACK_ID}.second`,
          urlState: {
            iceCream,
            currentView
          }
        }
        return nerdletForNavigation
      case 'THREE':
        nerdletForNavigation = {
          id: `${MULTIPLE_NERDLETS_EXAMPLE_NERDPACK_ID}.third`,
          urlState: {
            iceCream,
            currentView
          }
        }
        return nerdletForNavigation
      case 'FOUR':
        nerdletForNavigation = {
          id: `${SINGLE_NERDLET_EXAMPLE_NERDPACK_ID}.home`,
          urlState: {
            iceCream,
            currentView
          }
        }
        return nerdletForNavigation
    }

    return nerdletForNavigation
  }



  render() {
    return (
      <NerdletStateContext.Consumer>
        {(nerdletState) => {
          // State from elsewhere that I want to persist when the current nerdlet is changed
          const iceCreamState = nerdletState && nerdletState.iceCream
            ? nerdletState.iceCream
            : undefined

          return (
            <Card>
              <CardBody>
                <Grid
                  gapType={Grid.GAP_TYPE.SMALL}
                >
                  <GridItem columnSpan={3}>
                    <Button
                      type={this.isCurrentView(nerdletState, "ONE") ? Button.TYPE.PRIMARY : Button.TYPE.OUTLINE}
                      style={{width: '100%', height: '100%'}}
                      onClick={() => {
                        // See docs for example: https://developer.newrelic.com/apis/navigation/
                        const nerdlet = this.buildNerdletForNavigation({iceCream: iceCreamState, currentView: "ONE"})
                        navigation.replaceNerdlet(nerdlet)
                      }}
                    >One</Button>
                  </GridItem>
                  <GridItem columnSpan={3}>
                    <Button
                      type={this.isCurrentView(nerdletState, "TWO") ? Button.TYPE.PRIMARY : Button.TYPE.OUTLINE}
                      style={{width: '100%', height: '100%'}}
                      onClick={() => {
                        // See docs for example: https://developer.newrelic.com/apis/navigation/
                        const nerdlet = this.buildNerdletForNavigation({iceCream: iceCreamState, currentView: "TWO"})
                        navigation.replaceNerdlet(nerdlet)
                      }}
                    >Two</Button>
                  </GridItem>
                  <GridItem columnSpan={3}>
                    <Button
                      type={this.isCurrentView(nerdletState, "THREE") ? Button.TYPE.PRIMARY : Button.TYPE.OUTLINE}
                      style={{width: '100%', height: '100%'}}
                      onClick={() => {
                        const nerdlet = this.buildNerdletForNavigation({iceCream: iceCreamState, currentView: "THREE"})
                        navigation.replaceNerdlet(nerdlet)
                      }}
                    >Three</Button>
                  </GridItem>
                  <GridItem columnSpan={3}>
                    <Button
                      type={this.isCurrentView(nerdletState, "FOUR") ? Button.TYPE.PRIMARY : Button.TYPE.OUTLINE}
                      style={{width: '100%', height: '100%'}}
                      onClick={() => {
                        const nerdlet = this.buildNerdletForNavigation({iceCream: iceCreamState, currentView: "FOUR"})
                        navigation.replaceNerdlet(nerdlet)
                      }}
                    >Four</Button>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          )
        }}
      </NerdletStateContext.Consumer>
    )
  }
}

