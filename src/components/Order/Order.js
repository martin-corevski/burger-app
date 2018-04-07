import React from 'react'

import classes from './Orders.scss'

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map(ing => {
    return <span
      key={ing}
      style={{textTransform: 'capitalize', margin: '0 8px'}}>
      {ing} ({props.ingredients[ing]})
    </span>
  })

  return (
    <div className={classes.order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  )
}

export default order
