import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {index, create, destroy} from '../api'
import AlbumInfo from './AlbumInfo'
// import './Album.scss'
import axios from 'axios'

class Album extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isActive: false
    }
  }

  addToWishlist = () => {
    const {id, cover_image} = this.props
    const vinyl = {
      collection_type: 'wishlist',
      id,
      cover_image
    }
    create(vinyl, this.props.user)
      .then(console.log)
      .catch(console.err)
  }

  removeFromWishlist = () => {
    destroy(this.props._id, this.props.user.token).catch(console.err)
      .then(response => {
        this.props.removeAlbum(this.props.id)
      })
  }

  // old way to show
  // onMouseEnter = (e) => e.currentTarget.children[0].classList.remove('d-none')

  // React way to show element onMouseOver
  onMouseEnter = (e) => {
    e.stopPropagation()
    this.setState((state, props) => ({
      isActive: true
    }))
  }

  // old way to hide
  // onMouseLeave = (e) => e.currentTarget.children[0].classList.add('d-none')

  // React way to hide element onMouseOut
  onMouseLeave = (e) => {
    this.setState((state, props) => ({
      isActive: false
    }))
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
      ((this.props.isResults && <AlbumInfo isResults={true} addToWishlist={this.addToWishlist} title={title} cover_image={cover_image}/>) ||
      (this.props.isWishlist && <AlbumInfo isWishlist={true} removeFromWishlist={this.removeFromWishlist} title={title} cover_image={cover_image}/>))

    // keep all logic outside of render return
    // create functions and varialbes outside and use
    return (
      <div
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

export default Album