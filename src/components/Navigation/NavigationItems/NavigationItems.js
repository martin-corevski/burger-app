import React from 'react'

import classes from './NavigationItems.scss'
import NavigationItem from '../NavigationItem/NavigationItem'

export const navigationItems = (props) => {
  let user = <NavigationItem link='/auth'>Authenticate</NavigationItem>
  let orders = null

  if (props.isLoggedIn) {
    user = <NavigationItem link='/logout'>Log out</NavigationItem>
    orders = <NavigationItem link='/orders'>My Orders</NavigationItem>
  }

  return (
    <ul className={classes.navigationItems}>
      <NavigationItem
        link='/'
        exact
      >
        Burger Builder
      </NavigationItem>
      {orders}
      {user}
    </ul>
  )
}

export default navigationItems
