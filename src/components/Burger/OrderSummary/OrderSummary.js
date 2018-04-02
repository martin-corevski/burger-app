import React from 'react'

import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingsSummary = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
    </li>
  ))

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingsSummary}
      </ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        btnType='danger'
        click={props.cancelOrdering}>
        CANCEL
      </Button>
      <Button
        btnType='success'
        click={props.continueWithOrder}>
        CONTINUE
      </Button>
    </Aux>
  )
}

export default orderSummary
