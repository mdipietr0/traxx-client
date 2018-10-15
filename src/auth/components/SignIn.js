import React, { Component, Link } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import '../style.scss'

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
      .then(() => flash(messages.signInSuccess, 'alert alert-success'))
      .then(() => history.goBack())
      .catch(() => flash(messages.signInFailure, 'alert alert-danger'))
  }

  render () {
    const { email, password } = this.state

    return (
      <form className='form-container container col-md-4' onSubmit={this.signIn}>
        <div className='form-group'>
          <h3 className='text-center mt-5 p-3'>Sign In</h3>
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
        <button type='submit' className='btn btn-block btn-primary rounded-0 bg-white text-primary'>Sign In</button>
        <p className='text-center p-2'>Not yet a member? <NavLink to='/sign-up'>Create an account</NavLink>.</p>
      </form>
    )
  }
}

export default withRouter(SignIn)
