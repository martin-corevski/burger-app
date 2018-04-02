import React from 'react'

import classes from './Toolbar.scss'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <div>
      MENU
    </div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar
