import { takeEvery } from 'redux-saga/effects'

import { logoutSaga, authTimeoutSaga, authSaga } from './auth'
import * as actionTypes from '../actions/actionTypes'

export function * watchAuth () {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_TIMEOUT, authTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INIT, authSaga)
}
