import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'

export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount () {
    this.createBurger()
  }

  createBurger = () => {
    const { location: { search } } = this.props
    const queryString = require('query-string')
    const { bacon, cheese, meat, salad, price } = queryString.parse(search)

    // const query = new URLSearchParams(search)
    // const ingredients = {}
    // let price = 0;
    // for (let param in query.entries()) {
    //   // param = ['bacon', '1']
    //   if (param[0] === 'price') {
    //      price = param[1]
    //   }
    //   ingredients[param[0]] = +param[1]
    // }

    this.setState({
      ingredients: {
        bacon: +bacon,
        cheese: +cheese,
        meat: +meat,
        salad: +salad
      },
      totalPrice: +price
    })
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack()
  }

  continueWithCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueWithCheckout={this.continueWithCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler} />
        {/*
          Passing props to ContactData component to make props.history
          available, the other option is to wrap ContactData withRouter HOC
        */}
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) =>
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          }
        />
      </div>
    )
  }
}
