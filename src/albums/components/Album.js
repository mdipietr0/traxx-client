import React, {Component} from 'react'
import { Link } from 'react-router-dom'
// refactor api calls into seperate file
import apiUrl from '../../apiConfig'

import {index, create} from '../api'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import ThumbInfo from './ThumbInfo'

import axios from 'axios'

library.add(faStroopwafel)

// import './Album.scss'

class Album extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isActive: false
    }
  }

  onWishlist = () => {
    const vinyl = {
      collection_type: 'wishlist',
      id,
      cover_image
    }
    create(vinyl, this.props.user)
      .then(console.log)
      .catch(console.err)
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
        style={!(this.state.isActive) ?
          {backgroundImage: 'url(\'' + cover_image + '\')'} :
          {
            background: 'linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(\'' + cover_image + '\')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        }
      >
        {(this.state.isActive) && <ThumbInfo onWishlist={this.onWishlist} title={title} cover_image={cover_image}/>}
        {/*
          Hard-coded test album
          <div className={(!this.state.isActive) ? 'd-none' : ''}>
          <h6 className='mt-5 p-2 text-left text-white'>Abbey Road</h6>
          <p className='p-2 mb-2 text-left text-white'>Abbey Road is the eleventh studio album by English rock band the Beatles, released on 26 September 1969 by Apple Records.</p>
          <FontAwesomeIcon icon="stroopwafel" />
        </div>
        */}
      </div>
    )
  }
}

export default Album
