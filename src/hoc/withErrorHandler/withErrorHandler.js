import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      }, null)

      this.resInterceptor = axios.interceptors.response.use(
        res => res
        , error => {
          // Please see if you've set up the baseURL in axios-orders.js file.
          this.setState({error})
        })
    }

    // It's good practice to remove (eject) the interceptors in order to avoid
    // memory leaks when multiple components are wrapped in withErrorHandler,
    // because each of the components will instantiate interceptors and they
    // will stay in-memory even though the component is not rendered on the
    // screen at the moment. This is important when we have "multi-page" SPA
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    closeErrorHandler = () => {
      this.setState({
        error: null
      })
    }

    render () {
      return (
        <Aux>
          <Modal show={this.state.error}
            cancelOrdering={this.closeErrorHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
