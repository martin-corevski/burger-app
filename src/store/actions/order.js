import * as actionTypes from './actionTypes'

export const orderBurgerSuccess = () => {
  return {
    type: actionTypes.ORDER_BURGER_SUCCESS
  }
}

export const orderBurgerError = error => {
  return {
    type: actionTypes.ORDER_BURGER_ERROR,
    err: error
  }
}

export const ordering = () => {
  return {
    type: actionTypes.ORDERING
  }
}

export const orderBurger = (order, token) => {
  // return dispatch => {
  //   dispatch(ordering()) // this method can be called from ContactData's
  //   // orderHandler method
  //   axios.post('/orders.json?auth=' + token, order)
  //     .then(response => {
  //       dispatch(orderBurgerSuccess())
  //       // this.props.history.push('/') is handled in initOrder action
  //     })
  //     .catch(error => {
  //       dispatch(orderBurgerError(error))
  //     })
  // }
  // Now with Redux Saga
  return {
    type: actionTypes.ORDER_BURGER,
    token,
    order
  }
}

export const initOrder = () => {
  return {
    type: actionTypes.INIT_ORDER
  }
}

export const getOrdersSuccess = orders => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders: orders,
    loading: false
  }
}

export const getOrdersError = error => {
  return {
    type: actionTypes.GET_ORDERS_ERROR,
    err: error,
    loading: false
  }
}

export const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START
  }
}

export const getOrders = (token, userId) => {
  // return dispatch => {
  //   dispatch(getOrdersStart())
  //   const queryParams =
  //     '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
  //   axios
  //     .get('/orders.json' + queryParams)
  //     .then(res => {
  //       /*
  //       const fetchedOrders = []
  //       for (var key in res.data) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key
  //         })
  //       }
  //        */
  //       dispatch(getOrdersSuccess(res.data))
  //     })
  //     .catch(err => {
  //       dispatch(getOrdersError(err))
  //     })
  // }
  // Now with Redux Saga
  return {
    type: actionTypes.GET_ORDERS,
    token,
    userId
  }
}
