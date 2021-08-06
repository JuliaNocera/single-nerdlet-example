import React from 'react'

import {BlockText, Dropdown, DropdownItem, NerdletStateContext, nerdlet, Spacing} from 'nr1'

const Header = () => {
  const handleSelect = (value) => {
    nerdlet.setUrlState({
      iceCream: value
    })
  }

  const isSelected = (nerdletState, value) => {
    if (!nerdletState && value === 'chocolate') {
      return true
    }
    const isSelected = nerdletState.iceCream === 'value'
    return isSelected
  }

  return (
    <NerdletStateContext.Consumer>
      {(nerdletState) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Dropdown title={`What type of ice cream do you like? ${nerdletState && nerdletState.iceCream ? nerdletState.iceCream : ''} `}>
            <DropdownItem
              selected={isSelected(nerdletState, 'chocolate')}
              onClick={() => handleSelect('chocolate')}
            >
              Chocolate
      </DropdownItem>
            <DropdownItem
              selected={isSelected(nerdletState, 'chocolate')}
              onClick={() => handleSelect('strawberry')}>Strawberry</DropdownItem>
            <DropdownItem
              selected={isSelected(nerdletState, 'chocolate')}
              onClick={() => handleSelect('vanilla')}>Vanilla</DropdownItem>
            <DropdownItem
              selected={isSelected(nerdletState, 'chocolate')}
              onClick={() => handleSelect('No thanks')}>Ice cream? No thank you.</DropdownItem>
          </Dropdown>
          { (nerdletState && nerdletState.iceCream) &&
            <Spacing type={[Spacing.TYPE.MEDIUM]} >
              <BlockText><em>Previously selected:</em> {nerdletState.iceCream}</BlockText>
            </Spacing>
          }
        </div>
      )}
    </NerdletStateContext.Consumer>
  )
}

export default Header;


