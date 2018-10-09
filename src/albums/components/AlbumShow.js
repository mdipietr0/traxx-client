import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {index, create, destroy} from '../api'
import AlbumInfo from './AlbumInfo'
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
    // call my api /vinyls/:id and get data with id
    // https://api.discogs.com/masters/24047
    const results = await axios(`https://api.discogs.com/masters/${this.props.location.state.id}`)
    this.setState({ results })
    // this.setState({ results })
  }

  renderTracklist = () => {
    if(this.state.results) {
      return this.state.results.data.tracklist.map(track => {
        return <li key={track.position}>{track.title}</li>
      })
    }
  }


  render () {
    this.state.results && console.log(this.state.results)
    return (
      <div className='container'>
        <div className='row'>
          <img src={this.props.location.state.cover_image} />
        </div>
        <h1>{this.props.location.state.id}</h1>
        <ul>{this.renderTracklist()}</ul>
      </div>
    )
  }
}

export default AlbumShow
