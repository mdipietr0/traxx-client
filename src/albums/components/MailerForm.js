import React, {Fragment, Component} from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {index, create, destroy, mailer} from '../api'
import AlbumInfo from './AlbumInfo'
import messages from '../messages'
import Album from './Album'
import axios from 'axios'

class MailerForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      to: '',
      from: 'traxx',
      subject: 'Check out my albums',
      html: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  createEmailBody = (content) => {
    return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>My Wishlist</title>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </head>
        <body>
          <div className="container-fluid mt-5">
            <div className="d-flex flex-wrap justify-content-center">
              ${content.join('')}
            </div>
          </div>
        </body>
      </html>
      `
  }

  handleError = res => {
    if (res.status !== 201) {
      throw new Error()
    } else {
      return res
    }
  }

  sendMailer = async (e) => {
    e.preventDefault()
    const { user, flash } = this.props
    const { wishlist } = this.props.location.state
    const wishlistElement = wishlist.map(item => {
      return `
        <a href='https://mdipietr0.github.io/traxx-client/#/'><img src=${item.cover_image} /></a>
        <h2>${item.title}</h2>
        `
    })
    await this.setState({
      html: this.createEmailBody(wishlistElement)
    })
    const { to, from, subject, html } = this.state
    const mail = { from, to, subject, html }
    mailer(mail, user)
      .then(this.handleError)
      .then(() => flash(messages.wishlistShareSuccess, 'alert alert-success'))
      .catch(() => flash(messages.wishlistShareFailure, 'alert alert-danger'))
  }

  render () {
    const {to, subject} = this.state
    const mailerForm = (
      <form className='form-container container col-md-4' onSubmit={(e) => this.sendMailer(e)}>
        <div className='form-group'>
          <h3 className='text-center mt-5 p-3'>Share Wishlist</h3>
          <input
            required
            name='to'
            type='email'
            value={to}
            className='form-control rounded-0'
            id='toEmail'
            aria-describedby='toEmailHelp'
            placeholder='To Email'
            onChange={this.handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            required
            hidden
            name='subject'
            type='text'
            value={subject}
            className='form-control rounded-0'
            id='subject'
            placeholder='Subject'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' className='btn btn-block btn-primary rounded-0 bg-white text-primary'>Share</button>
      </form>
    )
    return this.props.location.state ? mailerForm : <Redirect to='/' />
  }
}

export default withRouter(MailerForm)
