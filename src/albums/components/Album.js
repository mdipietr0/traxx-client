import React, {Fragment, Component} from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {index, create, destroy} from '../api'
import AlbumInfo from './AlbumInfo'
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

  authenticateUser = (user, history) => {
    if (!user) {
      history.push('/sign-in')
      return
    }
  }

  addToWishlist = (e) => {
    const {history, user, id, cover_image} = this.props
    e.stopPropagation()

    const vinyl = {
      collection_type: 'wishlist',
      id,
      cover_image
    }
    create(vinyl, this.props.user)
      .then(console.log)
      .catch(console.err)
  }

  removeFromWishlist = (e) => {
    e.stopPropagation()
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

  onClick = () => {
    console.log('show')
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/albumshow',
        state: {
          id: this.props.id,
          cover_image: this.props.cover_image
        }
      }}/>
    }
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
      (this.props.isWishlist && <AlbumInfo isWishlist={true} removeFromWishlist={(e) => this.removeFromWishlist(e)} title={title} cover_image={cover_image}/>))

    // keep all logic outside of render return
    // create functions and varialbes outside and use
    return (
      <Fragment>
        {this.renderRedirect()}
        <div
          onClick={this.onClick}
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
      </Fragment>
    )
  }
}

export default withRouter(Album)
