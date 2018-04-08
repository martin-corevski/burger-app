import React from 'react'

import classes from './Input.scss'

const input = (props) => {
  let inputElement = null
  let inputClasses = [classes.inputElement]
  let validationError = null

  if (props.touched && !props.valid && props.shouldValidate) {
    if (props.valueType) {
      validationError = (
        <p
          className={classes.validationError}>
          Please enter a valid {props.valueType}!
        </p>
      )
    }
    if (props.errorMessage) {
      validationError = (
        <p
          className={classes.validationError}>
          {props.errorMessage}
        </p>
      )
    }
    inputClasses.push(classes.invalid)
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.change} />
      break
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.change} />
      break
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.change} >
          {
            props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))
          }
        </select>
      )
      break
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.change} />
      break
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input
