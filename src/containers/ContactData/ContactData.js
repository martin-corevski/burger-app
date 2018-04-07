import React, { Component } from 'react'
import axios from '../../axios-orders'

import classes from './ContactData.scss'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxiliary'

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log('[ContactData] ingredients ', this.props.ingredients)

    this.setState({
      loading: true
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: 'M C',
        address: {
          street: 69,
          house: 12,
          zipCode: 1000
        },
        email: 'mail@email.com'
      },
      deliveryMethod: 'asap'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error)
        this.setState({
          loading: false
        })
      })
  }

  render () {
    let form = <Spinner />

    if (!this.state.loading) {
      form = (
        <Aux>
          <h4>Enter your contact data</h4>
          <form>
            <input type='text' name='name' placeholder='Your name' />
            <input type='text' name='email' placeholder='Your email' />
            <input type='text' name='street' placeholder='Street' />
            <input type='text' name='postalCode' placeholder='Postal code' />
            <Button btnType='success' click={this.orderHandler}>ORDER</Button>
          </form>
        </Aux>
      )
    }

    return (
      <div className={classes.contactData}>
        {form}
      </div>
    )
  }
}
