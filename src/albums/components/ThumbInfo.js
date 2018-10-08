import React, {Fragment, Component} from 'react'
import { Link } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle)
library.add(faHeart)

import '../styles/ThumbInfo.scss'

// import './Album.scss'

class ThumbInfo extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  addToWishlist = () => {
    console.log('Add to Wishlist')
    this.props.onWishlist()
  }

  addToFavorites = () => {
    console.log('Add to Favorites')
  }

  render () {
    return (
      <Fragment>
        {/* <h5 className='mt-4 pl-2 text-left text-white'>Abbey Road</h5> */}
        <h6 className='mt-4 pl-2 text-left text-white'>{this.props.title}</h6>

        {/* <p className='p-2 mb-2 text-left text-white'>Abbey Road is the eleventh studio album by English rock band the Beatles, released on 26 September 1969 by Apple Records.</p> */}
        <div className='pl-2 pb-3'>
          <FontAwesomeIcon onClick={this.addToWishlist} className='icon-wrapper px-1' title="Add to wishlist" color='white' icon={['fas', 'plus-circle']} />
          <FontAwesomeIcon onClick={this.addToFavorites} className='icon-wrapper px-1' title="Add to favorites" color='white' icon={['fas', 'heart']} />
        </div>
      </Fragment>
    )
  }
}

export default ThumbInfo
