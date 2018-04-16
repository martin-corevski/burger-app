import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

// With the export keyword BurgerBuilder can be imported as a named export
export class BurgerBuilder extends Component {
  state = {
    ordering: false,
    loading: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }

  updateOrderState (ingredients) {
    // get the keys and map their values into an array (keys and map funcs),
    // (reduce func) sum the contents of the array starting with sum = 0
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, elem) => {
        return sum + elem
      }, 0)

    return sum > 0
  }

  orderHandler = () => {
    if (this.props.isLoggedIn) {
      this.setState({
        ordering: true
      })
    } else {
      this.props.onOrderSignIn('/checkout')
      this.props.history.push('/auth')
    }
  }

  cancelOrderHandler = () => {
    this.setState({
      ordering: false
    })
  }

  continueWithOrderHandler = () => {
    this.props.onInitOrder()
    this.props.history.push('/checkout')
  }

  render () {
    // copy state ingredients for immutability
    const disabledIngredients = {
      ...this.props.ings
    }
    // Update each ingredient with true/false value, so every key value pair
    // would be keeping info whether to disable the less button or not.
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.err ? <p>{this.props.err.message}</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledIngredients}
            canOrder={this.updateOrderState(this.props.ings)}
            ordering={this.orderHandler}
            isLoggedIn={this.props.isLoggedIn}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
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
          cancelOrdering={this.cancelOrderHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    err: state.burger.error,
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: key => dispatch(actionCreators.addIngredient(key)),
    onRemoveIngredient: key => dispatch(actionCreators.removeIngredient(key)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitOrder: () => dispatch(actionCreators.initOrder()),
    onOrderSignIn: path => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
)
