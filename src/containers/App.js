import React, { Component } from 'react'

import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // ///////////////////////////////
  //  LIFECYCLE HOOKS (METHODS)  //
  // ///////////////////////////////

  // COMPONENT MOUNT

  componentWillMount () {
    console.log('[App.js] componentWillMount')
  }

  componentWillUnmount () {
    // Component is about to get removed => Perform any cleanup work here!
    console.log('[App.js] componentWillUnmount')
  }

  componentDidMount () {
    console.log('[App.js] componentDidMount')
  }

  // COMPONENT UPDATE

  componentWillReceiveProps (nextProps) {
    console.log('[App.js] componentWillReceiveProps', nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate () {
    console.log('[App.js] componentWillUpdate')
  }

  componentDidUpdate () {
    console.log('[App.js] componentDidUpdate')
  }

  // ////////////
  //  HANDLERS //
  // ////////////

  render () {
    console.log('[App.js] render')

    return (
      <div>
        <Layout>
          <BurgerBuilder>Burger project setup works!</BurgerBuilder>
        </Layout>
      </div>
    )
  }
}

export default App
