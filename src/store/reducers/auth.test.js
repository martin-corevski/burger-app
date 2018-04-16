import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }
  })

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return initial state', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: 'token-id',
        userId: 'user-id'
      })
    ).toEqual({
      token: 'token-id',
      userId: 'user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
