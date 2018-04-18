import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actionCreators from '../actions'

export function * initIngredientsSaga (action) {
  try {
    const res = yield axios.get('/ingredients.json')
    yield put(actionCreators.setIngredients(res.data))
  } catch (err) {
    yield put(actionCreators.getIngredientsError(err))
  }
}
