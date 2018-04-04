import React, { Component } from 'react'

import classes from './Modal.scss'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

export default class Modal extends Component {
  // In Modal we override the shouldComponentUpdate method because we don't
  // need to rerender the OrderSummary component (for which the modal works as a
  // wrapper, see BurgerBuilder.js) if the modal is not shown on the screen.
  shouldComponentUpdate (nextProps, nextState) {
    // Update component only if the modal is oppened or closed, in other words
    // if props.show changed
    return nextProps.show !== this.props.show ||
    nextProps.children !== this.props.children
    // with children we are taking into consideration the spinner and order
    // summary components when deciding whether or not to update the component
  }

  componentWillUpdate () {
    console.log('[Modal.js] willUpdate!')
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} close={this.props.cancelOrdering} />
        <div className={classes.modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}
