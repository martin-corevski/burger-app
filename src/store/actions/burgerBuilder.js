import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ings: ingredients
  }
}

const getIngredientsError = (err) => {
  return {
    type: actionTypes.INIT_INGREDIENTS_ERROR,
    error: err
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(getIngredientsError(err))
      })
  }
}

export const addIngredient = (key) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    key: key
  }
}

export const removeIngredient = (key) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    key: key
  }
}
