import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import classes from './ContactData.scss'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxiliary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../components/UI/Input/Input'
import * as actionCreators from '../../store/actions/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        valueType: 'name',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        valueType: 'street',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        valueType: 'ZIP CODE',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5
        },
        isValid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        valueType: 'country',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        valueType: 'email address',
        validation: {
          required: true
        },
        isValid: false,
        errorMessage: 'Please enter a valid email address like name@gmail.com!',
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fast', displayValue: 'Fast'},
            {value: 'free', displayValue: 'Free'}
          ]
        },
        value: 'fast',
        validation: {},
        isValid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let inputId in this.state.orderForm) {
      formData[inputId] = this.state.orderForm[inputId].value
    }

    // Loading spinner, it's activated inside the action creator, in the
    // onOrderBurger action
    // this.props.onOrdering()

    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    }

    this.props.onOrderBurger(order)
  }

  checkIsValid (value, rules) {
    let isValid = true
    // if no validation object is configured for the input, return true
    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  inputChangeHandler = (event, inputId) => {
    // by destructuring the orderForm we are not deep copying every level of
    // the object, the next levels are only passed as reference
    const copyOfForm = {...this.state.orderForm}
    const input = {...copyOfForm[inputId]}
    // if there is a need to deep copy the elementConfig we would need to do
    // another destructuring
    // const conf = {...input.elementConfig}
    input.value = event.target.value
    input.isValid = this.checkIsValid(input.value, input.validation)
    input.touched = true
    // console.log(input.isValid)
    copyOfForm[inputId] = input

    let formIsValid = true
    for (let input in copyOfForm) {
      formIsValid = copyOfForm[input].isValid && formIsValid
    }

    this.setState({
      orderForm: copyOfForm,
      formIsValid
    })
  }

  render () {
    let contact = <Spinner />

    if (!this.props.loading) {
      const orderForm = this.state.orderForm
      const form = Object.keys(orderForm).map(key => {
        return <Input
          key={key}
          label={key}
          elementType={orderForm[key].elementType}
          elementConfig={orderForm[key].elementConfig}
          value={orderForm[key].value}
          valid={orderForm[key].isValid}
          shouldValidate={orderForm[key].validation}
          touched={orderForm[key].touched}
          valueType={orderForm[key].valueType}
          errorMessage={orderForm[key].errorMessage}
          change={(event) => this.inputChangeHandler(event, key)} />
      })
      contact = (
        <Aux>
          <h4>Enter your contact data</h4>
          <form onSubmit={this.orderHandler}>
            {form}
            <Button
              btnType='success'
              disabled={!this.state.formIsValid}>
              ORDER
            </Button>
          </form>
        </Aux>
      )
    }

    return (
      <div className={classes.contactData}>
        {contact}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onOrdering: () => dispatch(actionCreators.ordering()),
    onOrderBurger: (order) => dispatch(actionCreators.orderBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
