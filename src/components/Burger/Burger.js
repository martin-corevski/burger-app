import React from 'react'

import classes from './Burger.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
  // with keys we get type of ingredient, salad, bacon... then the map method
  // gets the number of each type of ingredient and at the end we create the
  // elements
  let ingredients = Object.keys(props.ingredients).map((key) => {
    return [...Array(props.ingredients[key])].map((_, i) => {
      return <BurgerIngredient key={key + i} type={key} />
    })
  }).reduce((arr, elem) => {
    return arr.concat(elem)
  }, [])

  if (ingredients.length === 0) {
    ingredients = <p>Please add some ingredients</p>
  }
  return (
    <div className={classes.burger}>
      <BurgerIngredient type='bread-top' />
      {ingredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger
