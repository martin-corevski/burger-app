import * as actionTypes from './actions.js'

const intialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 3
}

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
}

const reducer = (state = intialState, action) => {
  // For the totalPrice update we could do it in a separate action in order to
  // keep the 1 state property update per action "rule"
  if (action.type === actionTypes.ADD_INGREDIENT) {
    // let ings = {...state.ingredients}
    // ings[action.key]++
    // return {
    //   ...state,
    //   ingredients: ings,
    //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.key]
    // }
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.key]: state.ingredients[action.key] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.key]
    }
  }
  if (action.type === actionTypes.REMOVE_INGREDIENT) {
    // let ings = {...state.ingredients}
    // ings[action.key]--
    // return {
    //   ...state,
    //   ingredients: ings,
    //   totalPrice: state.totalPrice - INGREDIENT_PRICES[action.key]
    // }
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.key]: state.ingredients[action.key] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.key]
    }
  }
  return state
}

export default reducer
