import React from 'react'

import burgerLogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.scss'

export const logo = (props) => (
  <div className={classes.logo}>
    <img src={burgerLogo} alt='Burger logo' />
  </div>
)

export default logo
