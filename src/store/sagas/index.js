import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { initIngredientsSaga } from './burgerBuilder'
import { orderBurgerSaga, getOrdersSaga } from './order'
import {
  logoutSaga,
  authTimeoutSaga,
  authSaga,
  checkAuthStateSaga
} from './auth'
import * as actionTypes from '../actions/actionTypes'

export function * watchBurgerBuilder () {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function * watchOrder () {
  yield takeEvery(actionTypes.ORDER_BURGER, orderBurgerSaga)
  // With takeLatest we are only working with the last action fired
  yield takeLatest(actionTypes.GET_ORDERS, getOrdersSaga)
}

export function * watchAuth () {
  // With all everything runs in parallel, which doesn't make sense for this
  // example but it is an example of how to use all()
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_TIMEOUT, authTimeoutSaga),
    takeEvery(actionTypes.AUTH_INIT, authSaga),
    takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga)
  ])
}
