import React from 'react'

import classes from './Button.scss'

const button = (props) => (
  <button className={[classes.button, classes[props.btnType]].join(' ')}
    onClick={props.click}>
    {props.children}
  </button>
)

export default button
