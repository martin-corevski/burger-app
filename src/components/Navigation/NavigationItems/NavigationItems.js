import React from 'react'

import classes from './NavigationItems.scss'
import NavigationItem from '../NavigationItem/NavigationItem'

export const navigationItems = (props) => {
  let user = <NavigationItem
    link='/auth'
    closeSideDrawer={props.closeSideDrawer}>Authenticate</NavigationItem>
  let orders = null

  if (props.isLoggedIn) {
    user = <NavigationItem
      link='/logout'
      closeSideDrawer={props.closeSideDrawer}>Log out</NavigationItem>
    orders = <NavigationItem
      link='/orders'
      closeSideDrawer={props.closeSideDrawer}>My Orders</NavigationItem>
  }

  return (
    <ul className={classes.navigationItems}>
      <NavigationItem
        link='/'
        closeSideDrawer={props.closeSideDrawer}
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
