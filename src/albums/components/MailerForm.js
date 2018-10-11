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

  sendMailer = async (e) => {
    e.preventDefault()
    const { user } = this.props
    const { wishlist } = this.props.location.state
    const wishlistElement = wishlist.map(item => {
      return `
        <img src=${item.cover_image} />
        <h2>${item.title}</h2>
        `
    })
    await this.setState({
      html: this.createEmailBody(wishlistElement)
    })
    const { to, from, subject, html } = this.state
    const mail = { from, to, subject, html }
    console.log(mail)
    mailer(mail, user)
  }

  render () {

    const {to, subject} = this.state
    return (
      <form className='form-container container' onSubmit={(e) => this.sendMailer(e)}>
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
  }
}

export default withRouter(MailerForm)
