import React from 'react'

import classes from './NavigationItems.scss'
import NavigationItem from '../NavigationItem/NavigationItem'

export const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
)

export default navigationItems
