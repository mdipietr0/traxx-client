import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

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
      .then(() => flash(messages.signUpSuccess, 'alert alert-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'alert alert-danger'))
  }

  render () {
    const { email, password, passwordConfirmation} = this.state

    return (
      <form className='form-container container' onSubmit={this.signUp}>
        <div className='form-group'>
          <h3 className='text-center mt-5 p-3'>Sign Up</h3>
          <input
            required
            name='email'
            type='email'
            value={email}
            className='form-control rounded-0'
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
            className='form-control rounded-0'
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
            className='form-control rounded-0'
            id='passwordConfirmation'
            placeholder='Confirm Password'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-block btn-primary rounded-0 bg-white text-primary'>Sign Up</button>
        <p className='text-center p-2'>Already a member? <NavLink to='/sign-in'>Log in</NavLink>.</p>
      </form>
    )
  }
}

export default withRouter(SignUp)
