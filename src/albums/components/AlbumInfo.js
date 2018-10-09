import React, {Fragment, Component} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle, faHeart } from '@fortawesome/free-solid-svg-icons'
import '../styles/AlbumInfo.scss'

library.add(faPlusCircle)
library.add(faMinusCircle)
library.add(faHeart)

class AlbumInfo extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    const icons = this.props.isResults && (
      <Fragment>
        <FontAwesomeIcon
          onClick={this.props.addToWishlist}
          className='icon-wrapper px-1'
          title="Add to wishlist"
          color='white'
          icon={['fas', 'plus-circle']}
        />
        <FontAwesomeIcon
          onClick={this.addToFavorites}
          className='icon-wrapper px-1'
          title="Add to favorites"
          color='white'
          icon={['fas', 'heart']}
        />
      </Fragment>) ||
      this.props.isWishlist &&
      <FontAwesomeIcon
        onClick={this.props.removeFromWishlist}
        className='icon-wrapper px-1'
        title="Remove from wishlist"
        color='white'
        icon={['fas', 'minus-circle']}
      />

    return (
      <Fragment>
        <h6 className='mt-4 pl-2 text-left text-white'>{this.props.title}</h6>
        <div className='pl-2 pb-3'>
          {icons}
        </div>
      </Fragment>
    )
  }
}

export default AlbumInfo
