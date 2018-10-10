import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, changePassword } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  changePassword = event => {
    event.preventDefault()

    const { oldPassword, newPassword } = this.state
    const { flash, history, user } = this.props

    changePassword(this.state, user)
      .then(handleErrors)
      .then(() => flash(messages.changePasswordSuccess, 'alert alert-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'alert alert-danger'))
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='form-container container' onSubmit={this.changePassword}>
        <h3 className='text-center mt-5 p-3'>Change Password</h3>
        <div className='form-group'>
          <input
            required
            name='oldPassword'
            type='password'
            value={oldPassword}
            className='form-control rounded-0'
            id='oldPassword'
            aria-describedby='oldPasswordHelp'
            placeholder='Old Password'
            onChange={this.handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            required
            name='newPassword'
            type='password'
            value={newPassword}
            className='form-control rounded-0'
            id='newPassword'
            aria-describedby='newPasswordHelp'
            placeholder='New Password'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-block btn-primary rounded-0 bg-white text-primary'>Change Password</button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
