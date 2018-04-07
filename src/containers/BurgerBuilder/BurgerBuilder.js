import React, {Component} from 'react'
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    canOrder: false,
    ordering: false,
    loading: false,
    error: null
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
        this.updateOrderState(res.data)
      })
      .catch(err => {
        this.setState({
          error: err
        })
      })
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

  orderHandler = () => {
    this.setState({
      ordering: true
    })
  }

  cancelOrderHandler = () => {
    this.setState({
      ordering: false
    })
  }

  continueWithOrderHandler = () => {
    const ingredients = {...this.state.ingredients}
    const queryParams = Object.keys(ingredients).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(ingredients[key])
    })

    // const queryParams = []
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }

    queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice))
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    })
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

    let orderSummary = null
    let burger = this.state.error
      ? <p>{this.state.error.message}</p>
      : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}
            disabled={disabledIngredients}
            canOrder={this.state.canOrder}
            ordering={this.orderHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelOrdering={this.cancelOrderHandler}
          continueWithOrder={this.continueWithOrderHandler}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.ordering}
          cancelOrdering={this.cancelOrderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
