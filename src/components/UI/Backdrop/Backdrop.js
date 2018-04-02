import React from 'react'

import classes from './Backdrop.scss'

export const backdrop = (props) => (
  props.show ? <div className={classes.backdrop} onClick={props.close} /> : null
)

export default backdrop
