import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {index, create, destroy} from '../api'
import AlbumInfo from './AlbumInfo'
import Loading from './Loading'
// import './Album.scss'
import axios from 'axios'

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
