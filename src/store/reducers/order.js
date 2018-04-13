import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const intialState = {
  orders: null,
  loading: false,
  error: false,
  ordered: false
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ORDER:
      return updateObject(state, { ordered: false })
    case actionTypes.ORDERING:
      return updateObject(state, { loading: true })
    case actionTypes.ORDER_BURGER_SUCCESS:
      return updateObject(state, { loading: false, ordered: true })
    case actionTypes.ORDER_BURGER_ERROR:
      return updateObject(state, { loading: false, error: action.err })
    case actionTypes.GET_ORDERS_START:
      return updateObject(state, {loading: true})
    case actionTypes.GET_ORDERS_SUCCESS:
      return updateObject(state, {loading: false, orders: action.orders})
    case actionTypes.GET_ORDERS_ERROR:
      return updateObject(state, {loading: false, error: action.err})
    default:
      return state
  }
}

export default reducer
