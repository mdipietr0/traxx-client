import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './AlbumsIndex.scss'

class AlbumsIndex extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  onHover = () => {
    consoe.log('hover')
  }

  render () {

    const Albums = () => {
      const albums = []
      for (let i = 0; i < 21; i++){
        albums.push(
          <div
            key={i}
            onHover={this.onHover}
            className="album-thumb mb-auto m-1 display-box shadow"
          >
            <h6 className='mt-5 p-2 text-left text-white'>Abbey Road</h6>
            <p className='p-2 mb-2 text-left text-white'>Abbey Road is the eleventh studio album by English rock band the Beatles, released on 26 September 1969 by Apple Records.</p>
          </div>)
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
