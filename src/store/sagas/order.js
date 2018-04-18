import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actionCreators from '../actions'

export function * getOrdersSaga (action) {
  yield put(actionCreators.getOrdersStart())

  try {
    const queryParams =
      '?auth=' +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"'
    const res = yield axios.get('/orders.json' + queryParams)

    yield put(actionCreators.getOrdersSuccess(res.data))
  } catch (err) {
    yield put(actionCreators.getOrdersError(err))
  }
}

export function * orderBurgerSaga (action) {
  yield put(actionCreators.ordering())
  try {
    yield axios.post('/orders.json?auth=' + action.token, action.order)
    yield put(actionCreators.orderBurgerSuccess())
  } catch (error) {
    yield put(actionCreators.orderBurgerError(error))
  }
}
