import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Album from './Album'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {index} from '../api'

library.add(faStroopwafel)

import '../styles/AlbumsIndex.scss'

class Wishlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      wishlist: null
    }
  }

  componentDidMount() {
    index(this.props.user).catch(console.err)
      .then(response => {
        this.setState({
          wishlist: response.data.vinyls
        })
      })
  }

  render () {
    let wishlist
    if (this.state.wishlist) {
      wishlist = this.state.wishlist.map(w => {
        console.log(w)
        return <div
          key={w.id}
          className="album-thumb mb-auto m-1 display-box shadow"
        >
          <img src={w.cover_image}/>
        </div>
      })
    }
    return (
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap justify-content-center">
          <ul>{wishlist}</ul>
        </div>
      </div>
    )
  }
}

export default Wishlist
