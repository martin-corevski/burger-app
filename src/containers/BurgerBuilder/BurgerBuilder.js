import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    },
    totalPrice: 3,
    canOrder: false
  }

  updateOrderState (ingredients) {
    // get the keys and map their values into an array (keys and map funcs),
    // (reduce func) sum the contents of the array starting with sum = 0
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key]
    }).reduce((sum, elem) => {
      return sum + elem
    }, 0)

    this.setState({
      canOrder: sum > 0
    })
  }

  addIngredientHandler = type => {
    // let ingredients = Object.assign({}, this.state.ingredients)
    // or ES6 way
    let ingredients = { ...this.state.ingredients }
    let totalPrice = this.state.totalPrice
    let ingredientCount = ingredients[type]
    ingredientCount++
    ingredients[type] = ingredientCount
    totalPrice += INGREDIENT_PRICES[type]
    this.setState({
      ingredients,
      totalPrice
    })
    this.updateOrderState(ingredients)
  }

  removeIngredientHandler = type => {
    let ingredients = { ...this.state.ingredients }
    let totalPrice = this.state.totalPrice
    let ingredientCount = ingredients[type]
    // If-statements guard clauses:
    // The idea is that when you have something to assert in the beginning of a
    // method do this using a fast return.
    if (ingredientCount <= 0) {
      return
    }
    ingredientCount--
    ingredients[type] = ingredientCount
    totalPrice -= INGREDIENT_PRICES[type]
    this.setState({
      ingredients,
      totalPrice
    })
    this.updateOrderState(ingredients)
  }

  render () {
    // copy state ingredients for immutability
    const disabledIngredients = {
      ...this.state.ingredients
    }
    // Update each ingredient with true/false value, so every key value pair
    // would be keeping info whether to disable the less button or not.
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0
    }

    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}
          disabled={disabledIngredients}
          canOrder={this.state.canOrder}
        />
      </Aux>
    )
  }
}
