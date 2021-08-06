import React from 'react'

import {Dropdown, DropdownItem, NerdletStateContext, nerdlet} from 'nr1'

const Header = () => {
  const handleSelect = (value) => {
    console.log(value)
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
      {(nerdletState) => console.log({nerdletState}) || (
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
            onClick={() => handleSelect('none')}>Ice cream? No thank you.</DropdownItem>
        </Dropdown>
      )}
    </NerdletStateContext.Consumer>
  )
}

export default Header;
