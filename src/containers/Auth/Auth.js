import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import classes from './Auth.scss'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../components/UI/Input/Input'
import * as actionCreators from '../../store/actions/index'

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        valueType: 'email address',
        validation: {
          required: true,
          isEmail: true
        },
        isValid: false,
        errorMessage: 'Please enter a valid email address like name@gmail.com!',
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        valueType: 'password',
        validation: {
          required: true,
          minLength: 6
        },
        isValid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignUp: true
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/
      isValid = pattern.test(value) && isValid
    }

    return isValid
  }

  componentDidMount () {
    if (!this.props.isBuildingBurger && this.props.redirectPath !== '/') {
      this.props.onSetRedirectPath('/')
    }
  }

  inputChangeHandler = (event, inputId) => {
    const copyOfForm = {...this.state.authForm}
    const input = {...copyOfForm[inputId]}

    input.value = event.target.value
    input.isValid = this.checkIsValid(input.value, input.validation)
    input.touched = true
    copyOfForm[inputId] = input

    let formIsValid = true
    for (let input in copyOfForm) {
      formIsValid = copyOfForm[input].isValid && formIsValid
    }

    this.setState({
      authForm: copyOfForm,
      formIsValid
    })
  }

  authHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let inputId in this.state.authForm) {
      formData[inputId] = this.state.authForm[inputId].value
    }

    this.props.onAuth(formData.email, formData.password, this.state.isSignUp)
  }

  changeModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  render () {
    let auth = <Spinner />
    let errorMsg = null
    let redirectOnLogin = null

    if (this.props.isLoggedIn) {
      redirectOnLogin = <Redirect to={this.props.redirectPath} />
    }

    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>
    }

    if (!this.props.loading) {
      const authForm = this.state.authForm
      const form = Object.keys(authForm).map(key => {
        return <Input
          key={key}
          label={key}
          elementType={authForm[key].elementType}
          elementConfig={authForm[key].elementConfig}
          value={authForm[key].value}
          valid={authForm[key].isValid}
          shouldValidate={authForm[key].validation}
          touched={authForm[key].touched}
          valueType={authForm[key].valueType}
          errorMessage={authForm[key].errorMessage}
          change={(event) => this.inputChangeHandler(event, key)} />
      })
      auth = (
        <form onSubmit={this.authHandler}>
          {form}
          <Button
            btnType='success'
            disabled={!this.state.formIsValid}>
            {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </form>
      )
    }

    return (
      <div className={classes.auth}>
        {redirectOnLogin}
        {errorMsg}
        {auth}
        <Button btnType='danger' click={this.changeModeHandler}>
          SWITCH TO
          <strong>{this.state.isSignUp ? ' SIGN IN' : ' SIGN UP'}</strong>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isLoggedIn: state.auth.token !== null,
    redirectPath: state.auth.authRedirectPath,
    isBuildingBurger: state.burger.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass, isSignUp) => dispatch(actionCreators.auth(email, pass, isSignUp)),
    onSetRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))
