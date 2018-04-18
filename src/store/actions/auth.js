import axios from 'axios'
import * as actionTypes from './actionTypes'

// Set your API key in your .env.dev and .env.prod files
const API_KEY = process.env.DB_API_KEY

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: authData.idToken,
    userId: authData.localId
  }
}

export const authError = error => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error
  }
}

export const logout = () => {
  // Next 3 lines of code moved into saga
  // window.localStorage.removeItem('token')
  // window.localStorage.removeItem('expirationDate')
  // window.localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

// In order to keep the return statements in the action creators we are
// exporting another function and we are using it in the put method of auth
// saga instead of just returning type action.
export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = expirationTime => {
  // return dispatch => {
  //   // as soon as the token expires, logout the user
  //   setTimeout(() => {
  //     dispatch(logout())
  //   }, expirationTime * 1000)
  // }
  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime: expirationTime
  }
}

export const auth = (email, password, isSignUp) => {
  // return dispatch => {
  //   dispatch(authStart())
  //   const authData = {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }
  //   const baseURL =
  //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
  //   const url = isSignUp
  //     ? baseURL + 'signupNewUser?key=' + API_KEY
  //     : baseURL + 'verifyPassword?key=' + API_KEY
  //   axios
  //     .post(url, authData)
  //     .then(res => {
  //       const expirationDate = new Date(
  //         new Date().getTime() + res.data.expiresIn * 1000
  //       )
  //       window.localStorage.setItem('token', res.data.idToken)
  //       window.localStorage.setItem('expirationDate', expirationDate)
  //       window.localStorage.setItem('userId', res.data.localId)
  //       dispatch(authSuccess(res.data))
  //       dispatch(authTimeout(res.data.expiresIn))
  //     })
  //     .catch(err => {
  //       dispatch(authError(err.response.data.error))
  //     })
  // }
  // Now with Redux Saga
  return {
    type: actionTypes.AUTH_INIT,
    email,
    password,
    isSignUp
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(
        window.localStorage.getItem('expirationDate')
      )
      const today = new Date()
      if (expirationDate <= today) {
        dispatch(logout())
      } else {
        const userId = window.localStorage.getItem('userId')
        dispatch(authSuccess({ idToken: token, localId: userId }))
        dispatch(
          authTimeout((expirationDate.getTime() - today.getTime()) / 1000)
        )
      }
    }
  }
}
