import React from 'react'

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

describe('<BurgerBuilder />', () => {
  let wrapper

  // beforeEach helper method for repetitive code
  beforeEach(() => {
    // We need to pass onInitIngredients in order to fix the 'is not a function'
    // error
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
  })

  it('should render <BuildControls /> when receiving props', () => {
    wrapper.setProps({ ings: { bacon: 0 } })
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})
