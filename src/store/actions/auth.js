import axios from 'axios'
import * as actionTypes from './actionTypes'

// Set your API key
const API_KEY = ''

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: authData.idToken,
    userId: authData.localId
  }
}

const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error
  }
}

export const logout = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('expirationDate')
  window.localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = (expirationTime) => {
  return dispatch => {
    // as soon as the token expires, logout the user
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    const baseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
    const url = isSignUp
      ? baseURL + 'signupNewUser?key=' + API_KEY
      : baseURL + 'verifyPassword?key=' + API_KEY
    axios.post(url, authData)
      .then(res => {
        console.log(res)
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        window.localStorage.setItem('token', res.data.idToken)
        window.localStorage.setItem('expirationDate', expirationDate)
        window.localStorage.setItem('userId', res.data.localId)
        dispatch(authSuccess(res.data))
        dispatch(authTimeout(res.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authError(err.response.data.error))
      })
  }
}

export const setAuthRedirectPath = (path) => {
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
      const expirationDate = new Date(window.localStorage.getItem('expirationDate'))
      const today = new Date()
      if (expirationDate <= today) {
        dispatch(logout())
      } else {
        const userId = window.localStorage.getItem('userId')
        dispatch(authSuccess({idToken: token, localId: userId}))
        dispatch(authTimeout((expirationDate.getTime() - today.getTime()) / 1000))
      }
    }
  }
}
