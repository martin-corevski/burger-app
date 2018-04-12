import React from 'react'

import classes from './NavigationItems.scss'
import NavigationItem from '../NavigationItem/NavigationItem'

export const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem
      link='/'
      exact
    >
      Burger Builder
    </NavigationItem>
    <NavigationItem
      link='/orders'
    >
      My Orders
    </NavigationItem>
    <NavigationItem
      link='/auth'
    >
      Authenticate
    </NavigationItem>
  </ul>
)

export default navigationItems
