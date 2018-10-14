import React, {Component} from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import Album from './Album'
import {index} from '../api'
import '../styles/AlbumsIndex.scss'
import { mailer } from '../api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope)


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
    const { history } = this.props
    const { wishlist } = this.state
    history.push({
      pathname: '/mailerform',
      state: { wishlist }
    })
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
      <div className="container-fluid mt-2">
        <div className='row'>
          <div className='ml-auto pb-2 mr-5 mt-0'>
            <FontAwesomeIcon
              onClick={this.sendMailer}
              className='icon-wrapper icon-wrapper-black px-1'
              title="Share via email"
              color='black'
              icon={['fas', 'envelope']}
            />
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {wishlist}
          {!this.props.user && <Redirect to='/sign-in' />}
        </div>
      </div>
    )
  }
}

export default withRouter(Wishlist)
