import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {index, create, destroy} from '../api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import AlbumInfo from './AlbumInfo'
import Loading from './Loading'
// import './Album.scss'
import axios from 'axios'

library.add(faHeart)

class AlbumShow extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: null
    }
  }

  componentDidMount = async () => {
    if(!this.props.location.state) return
    // call my api /vinyls/:id and get data with id
    // https://api.discogs.com/masters/24047
    const results = await axios(`https://api.discogs.com/masters/${this.props.location.state.id}`)
    this.setState({ results })
    // this.setState({ results })
  }

  renderTracklist = () => {
    if(this.state.results) {
      return this.state.results.data.tracklist.map(track => {
        return <li key={track.position} className='list-group-item bg-light'>
          <div className='row'>
            <div>{track.title}</div>
            <div className='ml-auto'> {track.duration}</div>
          </div>
          {/* display artists on track */}
          {/* {track.extraartists.map((ea, i) => {
            return <li key={i}>{ea.role}: {ea.name}</li>
          })} */}
        </li>
      })
    }
  }


  render () {
    (this.state.results) && console.log(this.state.results.data)
    const display = (this.state.results) ?
      (
        <div className='container'>

          <div className='row'>
            <div className='p-3'>
              <img
                style={{height: '250px'}}
                src={this.props.location.state.cover_image}
              />
            </div>
            <div>
              <h2 className='m-3'>{this.state.results.data.title}</h2>
              <h5 className='m-3'>By {this.state.results.data.artists[0].name}</h5>
              <h5 className='m-3'>Released {this.state.results.data.year}</h5>
              {/* Add to wishlist works but need to refactor page to allow
                access from wishlist page as well as results page. PAge will
                need to change based on if it is wishlist or not */}
              {/* <FontAwesomeIcon
                onClick={this.props.location.state.addToWishlist}
                className='m-3 icon-wrapper icon-wrapper-black px-1'
                title="Add to wishlist"
                icon={['fas', 'heart']}
              /> */}
            </div>
          </div>
          <ul className="list-group list-group-flush bg-light">{this.renderTracklist()}</ul>
        </div>
      ) : (
        <Loading />
      )
    return display
  }
}

export default AlbumShow
