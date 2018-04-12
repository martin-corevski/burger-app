import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

class Orders extends Component {
  componentDidMount () {
    this.props.onGetOrders(this.props.token)
  }

  render () {
    let loader = null
    let orders = null

    if (this.props.loading) {
      loader = <Spinner />
    }

    if (!this.props.loading) {
      orders = <h1>No orders yet!</h1>
    }

    if (this.props.orders) {
      orders = Object.keys(this.props.orders).map(key => {
        return (
          <Order
            key={key}
            price={this.props.orders[key].price} ingredients={this.props.orders[key].ingredients} />
        )
      })
    }

    return (
      <div>
        {loader}
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: (token) => dispatch(actionCreators.getOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
