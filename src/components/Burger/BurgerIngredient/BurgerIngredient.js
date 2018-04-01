import React from 'react'
import PropTypes from 'prop-types'

import classes from './BurgerIngredient.scss'

const burgerIngredient = (props) => {
  let ingredient = null

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={classes.breadBottom} />
      break
    case 'bread-top':
      ingredient = (
        <div className={classes.breadTop} >
          <div className={classes.seeds1} />
          <div className={classes.seeds2} />
        </div>
      )
      break
    case 'meat':
      ingredient = <div className={classes.meat} />
      break
    case 'cheese':
      ingredient = <div className={classes.cheese} />
      break
    case 'salad':
      ingredient = <div className={classes.salad} />
      break
    case 'bacon':
      ingredient = <div className={classes.bacon} />
      break
    default:
      ingredient = null
  }

  return ingredient
}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient
