import React from 'react'

import classes from './Modal.scss'

const modal = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  )
}

export default modal
