import React from 'react'

import classes from './Toolbar.scss'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawerToggle from '../SideDrawerToggle/SideDrawerToggle'

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <SideDrawerToggle open={props.openSideDrawer} />
    <div className={classes.logo}>
      <Logo />
    </div>
    <nav className={classes.desktopOnly}>
      <NavigationItems isLoggedIn={props.isLoggedIn} />
    </nav>
  </header>
)

export default toolbar
