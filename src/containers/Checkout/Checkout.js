import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'
// import * as actionCreators from '../../store/actions/index'

class Checkout extends Component {
  // componentWillMount () {
  //   this.props.onInitOrder()
  // }

  cancelCheckoutHandler = () => {
    this.props.history.goBack()
  }

  continueWithCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {
    let summary = <Redirect to='/' />
    if (this.props.ings) {
      const ordered = this.props.ordered ? <Redirect to='/' /> : null
      summary = (
        <div>
          {ordered}
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

    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    ordered: state.order.ordered
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitOrder: () => dispatch(actionCreators.initOrder())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default connect(mapStateToProps)(Checkout)
