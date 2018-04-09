import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {
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
          ingredients={this.props.ings}
          continueWithCheckout={this.continueWithCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler} />
        {/*
          Passing props to ContactData component to make props.history
          available, the other option is to wrap ContactData withRouter HOC
        */}
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout)
