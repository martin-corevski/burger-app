import React from 'react'

import NavigationItems from './NavigationItems'
import NavigationItem from '../NavigationItem/NavigationItem'

describe('<NavigationItems />', () => {
  let wrapper

  // beforeEach helper method for repetitive code
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isLoggedIn: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should render logout <NavigationItem /> element if authenticated', () => {
    wrapper.setProps({ isLoggedIn: true })
    expect(
      wrapper.contains(<NavigationItem link='/logout'>Log out</NavigationItem>)
    ).toEqual(true)
  })
})
