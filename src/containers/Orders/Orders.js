import React, { Component } from 'react'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then(res => {
        /*
        const fetchedOrders = []
        for (var key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
         */

        this.setState({
          orders: res.data,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
  }

  render () {
    let loader = null
    let orders = null

    if (this.state.loading) {
      loader = <Spinner />
    }

    if (!this.state.loading) {
      orders = <h1>No orders yet!</h1>
    }

    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map(key => {
        return (
          <Order
            key={key}
            price={this.state.orders[key].price} ingredients={this.state.orders[key].ingredients} />
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

export default withErrorHandler(Orders, axios)
