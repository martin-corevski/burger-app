import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const intialState = {
  ingredients: null,
  totalPrice: 3,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
}

const initIngredients = (state, action) => {
  return updateObject(
    state,
    {
      ingredients: action.ings,
      totalPrice: 3,
      error: false,
      building: false
    }
  )
}

const initIngredientsError = (state, action) => {
  return updateObject(
    state,
    { error: action.error }
  )
}

const addIngredient = (state, action) => {
  return updateObject(
    state,
    {
      ingredients: {
        ...state.ingredients,
        [action.key]: state.ingredients[action.key] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.key],
      building: true
    })
}

const removeIngredient = (state, action) => {
  return updateObject(
    state,
    {
      ingredients: {
        ...state.ingredients,
        [action.key]: state.ingredients[action.key] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.key],
      building: true
    })
}

const reducer = (state = intialState, action) => {
  // For the totalPrice update we could do it in a separate action in order to
  // keep the 1 state property update per action "rule"
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.INIT_INGREDIENTS:
      return initIngredients(state, action)
    case actionTypes.INIT_INGREDIENTS_ERROR:
      return initIngredientsError(state, action)
    default:
      return state
  }
}

export default reducer
