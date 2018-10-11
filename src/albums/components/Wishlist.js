import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Album from './Album'
import {index} from '../api'
import '../styles/AlbumsIndex.scss'
import { mailer } from '../api'

class Wishlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      wishlist: null
    }
  }

  componentDidMount() {
    if(!this.props.user) return
    index(this.props.user).catch(console.err)
      .then(response => {
        this.setState({
          wishlist: response.data.vinyls
        })
      })
  }

  removeAlbum = (id) => {
    this.setState((state, props) => ({
      wishlist: state.wishlist.filter(album => album.id !== id)
    }))
  }

  sendMailer = () => {
    const tempMail = {
      from: 'traxx',
      to: 'alissapifer@gmail.com',
      subject: 'baby steps',
      html: '<h1>test 2</h1>'
    }
    mailer(tempMail, this.props.user)
  }

  render () {
    let wishlist
    if (this.state.wishlist) {
      wishlist = this.state.wishlist.map(w => {
        console.log(w)
        return <Album
          flash={this.props.flash}
          isWishlist={true}
          key={w.id}
          user={this.props.user}
          id={w.id}
          _id={w._id}
          title={w.title}
          cover_image={w.cover_image}
          className='album-thumb mb-auto m-1 display-box shadow'
          removeAlbum={this.removeAlbum}
        />
      })
    }

    return (
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap justify-content-center">
          {wishlist}
          <button onClick={this.sendMailer}>Share</button>
          {!this.props.user && <Redirect to='/sign-in' />}
        </div>
      </div>
    )
  }
}

export default Wishlist
