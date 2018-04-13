import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.scss'

export const navigationItem = (props) => (
  <li
    className={classes.navigationItem}
    onClick={props.closeSideDrawer}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
)

export default navigationItem
