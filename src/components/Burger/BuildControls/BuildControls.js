import React from 'react'

import classes from './BuildControls.scss'
import BuildControl from '../BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
]

const buildControls = (props) => (
  // If we want to do the binding in BuildControl we could send type as prop,
  // another valid way of sending arguments to the handler is by using arrow
  // function: addIngredient={() => props.addIngredient(ctrl.type)}
  <div className={classes.buildControls}>
    <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={props.addIngredient.bind(this, ctrl.type)}
        removeIngredient={props.removeIngredient.bind(this, ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    )
    )}
    <button className={classes.orderButton} disabled={!props.canOrder}>
      ORDER NOW
    </button>
  </div>
)

export default buildControls
