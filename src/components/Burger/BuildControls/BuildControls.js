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
  <div className={classes.buildControls}>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label} />
    )
    )}
  </div>
)

export default buildControls
