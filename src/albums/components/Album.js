import React, {Fragment, Component} from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {index, create, destroy} from '../api'
import AlbumInfo from './AlbumInfo'
import messages from '../messages'
// import './Album.scss'
import axios from 'axios'

class Album extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isActive: false,
      redirect: false
    }
  }

  addToWishlist = async (e) => {
    e.stopPropagation()
    const {history, user, id, cover_image, flash} = this.props
    if (!user) {
      history.push('/sign-in')
      return
    }
    const vinyl = {
      collection_type: 'wishlist',
      id,
      cover_image
    }
    try {
      const newRecord = await create(vinyl, this.props.user)
      flash(messages.addToWishlistSuccess, 'alert alert-success')
    } catch (err) {
      flash(messages.addToWishlistFailure, 'alert alert-danger')
    }
  }

  removeFromWishlist = async (e) => {
    e.stopPropagation()
    try {
      const response = await destroy(this.props._id, this.props.user.token)
      this.props.removeAlbum(this.props.id)
    } catch (err) {
      flash(messages.removeFromWishlistFailure, 'alert alert-danger')
    }
  }

  onMouseEnter = (e) => {
    e.stopPropagation()
    this.setState((state, props) => ({
      isActive: true
    }))
  }

  onMouseLeave = (e) => {
    e.stopPropagation()
    this.setState((state, props) => ({
      isActive: false
    }))
  }

  showAlbum = (e) => {
    this.props.history.push({
      pathname: '/albumshow',
      state: {
        id: this.props.id,
        cover_image: this.props.cover_image,
        addToWishlist: this.addToWishlist
      }
    })
  }

  render () {
    const {title, cover_image} = this.props
    const style = !(this.state.isActive) ?
      {backgroundImage: `url('${cover_image}')`} :
      {
        background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url('${cover_image}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    const thumbInfo = (this.state.isActive) &&
      ((this.props.isResults && <AlbumInfo isResults={true} addToWishlist={(e) => this.addToWishlist(e)} title={title} cover_image={cover_image}/>) ||
      (this.props.isWishlist && <AlbumInfo isWishlist={true} removeFromWishlist={(e) => this.removeFromWishlist(e)} title={title} cover_image={cover_image}/>) ||
      <AlbumInfo title={title} cover_image={cover_image} />)

    // keep all logic outside of render return
    // create functions and varialbes outside and use
    return (
      <div
        onClick={this.showAlbum}
        // use onMouseLeave and onMouseEnter instead of onMouseOver and onMouseOut
        // because the former only get called once while the latter will get called
        // when moving between descendants also. TLDR; fixes repeated firing
        onMouseLeave={(e) => this.onMouseLeave(e)}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        className="album-thumb mb-auto m-1 display-box shadow"
        style={style}
      >
        {thumbInfo}
      </div>
    )
  }
}

export default withRouter(Album)
