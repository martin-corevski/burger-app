import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actionCreators from '../actions'

// Set your API key in your .env.dev and .env.prod files
const API_KEY = process.env.DB_API_KEY
const AUTH_BASE_URL = process.env.AUTH_BASE_URL

export function * logoutSaga (action) {
  // yield window.localStorage.removeItem('token')
  // yield window.localStorage.removeItem('expirationDate')
  // yield window.localStorage.removeItem('userId')
  // In order to be able to test this function we need to rewrite all the
  // function calls with the call function:
  yield call([window.localStorage, 'removeItem'], 'token')
  yield call([window.localStorage, 'removeItem'], 'expirationDate')
  yield call([window.localStorage, 'removeItem'], 'userId')
  yield put(actionCreators.logoutSuccess())
}

export function * authTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000)
  yield put(actionCreators.logout())
}

export function * authSaga (action) {
  yield put(actionCreators.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  const url = action.isSignUp
    ? AUTH_BASE_URL + 'signupNewUser?key=' + API_KEY
    : AUTH_BASE_URL + 'verifyPassword?key=' + API_KEY

  try {
    // const res = yield axios.post(url, authData)
    const res = yield call([axios, 'post'], url, authData)
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    )
    // yield window.localStorage.setItem('token', res.data.idToken)
    // yield window.localStorage.setItem('expirationDate', expirationDate)
    // yield window.localStorage.setItem('userId', res.data.localId)
    yield call([window.localStorage, 'setItem'], 'token', res.data.idToken)
    yield call(
      [window.localStorage, 'setItem'],
      'expirationDate',
      expirationDate
    )
    yield call([window.localStorage, 'setItem'], 'userId', res.data.localId)
    yield put(actionCreators.authSuccess(res.data))
    yield put(actionCreators.authTimeout(res.data.expiresIn))
  } catch (error) {
    yield put(actionCreators.authError(error))
  }
}

export function * checkAuthStateSaga (action) {
  const token = yield window.localStorage.getItem('token')
  if (!token) {
    yield put(actionCreators.logout())
  } else {
    const expirationDate = yield new Date(
      window.localStorage.getItem('expirationDate')
    )
    const today = yield new Date()
    if (expirationDate <= today) {
      yield put(actionCreators.logout())
    } else {
      const userId = yield window.localStorage.getItem('userId')
      yield put(actionCreators.authSuccess({ idToken: token, localId: userId }))
      yield put(
        actionCreators.authTimeout(
          (expirationDate.getTime() - today.getTime()) / 1000
        )
      )
    }
  }
}
