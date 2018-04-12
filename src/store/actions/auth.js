import axios from 'axios'
import * as actionTypes from './actionTypes'

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
        dispatch(authSuccess(res.data))
        dispatch(authTimeout(res.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authError(err.response.data.error))
      })
  }
}
