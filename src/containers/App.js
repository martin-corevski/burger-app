import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout/Logout'
import * as actionCreators from '../store/actions'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.onCheckAuthState()
    console.log('[App.js] componentDidMount')
  }

  render () {
    console.log('[App.js] render')

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
