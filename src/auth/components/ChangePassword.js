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
      .then(() => flash(messages.changePasswordSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form onSubmit={this.changePassword}>
        <h3>Change Password</h3>
        <div className='form-group'>
          <input
            required
            name='oldPassword'
            type='password'
            value={oldPassword}
            className='form-control'
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
            className='form-control'
            id='newPassword'
            aria-describedby='newPasswordHelp'
            placeholder='New Password'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Change Password</button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
