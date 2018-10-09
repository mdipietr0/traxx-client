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
    // this.setState({ results })
  }


  render () {
    return (
      <div>
        <img src={this.props.location.state.cover_image} />
        <h1>{this.props.location.state.id}</h1>
      </div>
    )
  }
}

export default AlbumShow
