import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../Auxiliary'
import classes from './Layout.scss'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

// The Layout component could be part of the components folder, containers
// folder (since it's a statefull component) or the hoc folder (since it's a
// wrapper for the BurgerBuilder component, see App.js)
class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    this.setState({showSideDrawer: false})
  }

  openSideDrawerHandler = () => {
    this.setState({showSideDrawer: true})
  }

  render () {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.openSideDrawerHandler}
          isLoggedIn={this.props.isLoggedIn} />
        <SideDrawer
          isOpen={this.state.showSideDrawer}
          isLoggedIn={this.props.isLoggedIn}
          closeSideDrawer={this.closeSideDrawerHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
