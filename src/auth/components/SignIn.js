import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signIn = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { flash, history, setUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }

  render () {
    const { email, password } = this.state

    return (
      <form onSubmit={this.signIn}>
        <div className='form-group'>
          <h3>Sign In</h3>
          <input
            required
            name='email'
            type='email'
            value={email}
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Email'
            onChange={this.handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            required
            name='password'
            type='password'
            value={password}
            className='form-control'
            id='password'
            placeholder='Password'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Sign In</button>
      </form>
    )
  }
}

export default withRouter(SignIn)
