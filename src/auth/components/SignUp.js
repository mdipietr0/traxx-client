import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signUp = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation} = this.state
    const { flash, history, setUser } = this.props

    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { email, password, passwordConfirmation} = this.state

    return (
      <form onSubmit={this.signUp}>
        <div className='form-group'>
          <h3>Sign Up</h3>
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
        <div className='form-group'>
          <input
            required
            name='passwordConfirmation'
            type='password'
            value={passwordConfirmation}
            className='form-control'
            id='passwordConfirmation'
            placeholder='Confirm Password'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
