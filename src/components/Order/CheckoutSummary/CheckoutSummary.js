import React from 'react'

import classes from './CheckoutSummary.scss'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope you'll like it</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto'
        }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType='danger'
        click={props.cancelCheckout}>
        CANCEL
      </Button>
      <Button
        btnType='success'
        click={props.continueWithCheckout}>
        CONTINUE
      </Button>
    </div>
  )
}

export default checkoutSummary
