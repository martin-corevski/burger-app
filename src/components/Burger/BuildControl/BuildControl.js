import React from 'react'

import classes from './BuildControl.scss'

const buildControl = (props) => {
  return (
    <div className={classes.buildControl}>
      <div className={classes.label}>{props.label}</div>
      <button className={classes.less}>Less</button>
      <button className={classes.more}>More</button>
    </div>
  )
}

export default buildControl
