import React from 'react'

import classes from './BuildControl.scss'

const buildControl = (props) => {
  return (
    <div className={classes.buildControl}>
      <div className={classes.label}>{props.label}</div>
      <button
        className={classes.less}
        onClick={props.removeIngredient}
        disabled={props.disabled}>
        Less
      </button>
      {/* We could send props.type from BuildControls and then bind the onClick
        handler with this and props.type, example:
        onClick={props.ingredientAdd.bind(this, props.type)}
      but since we already have the type in BuildControls we will do it there */}
      <button
        className={classes.more}
        onClick={props.addIngredient}>
        More
      </button>
    </div>
  )
}

export default buildControl
