import * as actionTypes from './actionTypes'

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ings: ingredients
  }
}

export const getIngredientsError = err => {
  return {
    type: actionTypes.INIT_INGREDIENTS_ERROR,
    error: err
  }
}

export const initIngredients = () => {
  // return dispatch => {
  //   axios
  //     .get('/ingredients.json')
  //     .then(res => {
  //       dispatch(setIngredients(res.data))
  //     })
  //     .catch(err => {
  //       dispatch(getIngredientsError(err))
  //     })
  // }
  // Now with Redux Saga
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
}

export const addIngredient = key => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    key: key
  }
}

export const removeIngredient = key => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    key: key
  }
}
