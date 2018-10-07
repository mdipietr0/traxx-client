import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Album from './Album'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

import './AlbumsIndex.scss'

class AlbumsIndex extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  onMouseEnter = (e) => e.currentTarget.children[0].classList.remove('d-none')

  onMouseLeave = (e) => e.currentTarget.children[0].classList.add('d-none')

  render () {

    const Albums = () => {
      const albums = []
      for (let i = 0; i < 18; i++){
        albums.push(
          <Album
            key={i}
            // onMouseOut={(e) => this.onMouseLeave(e)}
            // onMouseOver={(e) => this.onMouseEnter(e)}
            className="album-thumb mb-auto m-1 display-box shadow"
          />
        )
      }
      return albums
    }

    return (
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap justify-content-center">
          <Albums />
        </div>
      </div>
    )
  }
}

export default AlbumsIndex
