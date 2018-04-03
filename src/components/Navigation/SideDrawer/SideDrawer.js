import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'
import classes from './SideDrawer.scss'

const sideDrawer = (props) => {
  let attachedClasses = [classes.sideDrawer, classes.close]

  if (props.isOpen) {
    attachedClasses[1] = classes.isOpen
  }

  return (
    <Aux>
      <Backdrop show={props.isOpen} close={props.closeSideDrawer} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer
