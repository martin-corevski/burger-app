import React from 'react'

import classes from './Toolbar.scss'
import Logo from '../../Logo/Logo'

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <div>
      MENU
    </div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
)

export default toolbar
