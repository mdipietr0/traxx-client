import React, {Fragment, Component} from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {index, create, destroy, mailer} from '../api'
import messages from '../messages'
import Album from './Album'
import axios from 'axios'

class LandingPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: ''
    }
  }
  componentDidMount = async () => {
    const year = (new Date()).getYear() + 1900
    console.log(year)
    const query = ''
    let results = await axios(`https://api.discogs.com/database/search?q=${query}&type=master&year=${year}&token=NcoQgYPGBIypBlMCtCHoHMAVWLIhKAMzSXKfBYan`)
    console.log(results.data.results)
    // await this.setState({ results })
    results = results.data.results
      .filter(album => !album.cover_image.includes('spacer.gif'))
      .map(album => {
        const {id, title, cover_image} = album
        return { id, title, cover_image }
      })

    results = results.map(result => (
      <Album
        flash={this.props.flash}
        isResults={true}
        key={result.id}
        user={this.props.user}
        id={result.id}
        title={result.title}
        cover_image={result.cover_image}
        className='album-thumb mb-auto m-1 display-box shadow'
      />
    ))
    await this.setState({ results })
  }

  render () {
    return (
      // <div className='container'>
      //   <h1>Landing Page</h1>
      //   <p>{this.state.results && this.state.results.data.results[0]}</p>
      // </div>
      <div className="container-fluid mt-5">
        <h4 className='mx-5'>New Releases</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.results}
        </div>
      </div>
    )
  }
}

export default withRouter(LandingPage)
