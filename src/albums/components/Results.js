import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Album from './Album'
import '../styles/AlbumsIndex.scss'

class Results extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: null
    }
  }

  async componentDidMount() {
    const results = await axios('https://api.discogs.com/database/search?q=abbey%20road&type=master&token=NcoQgYPGBIypBlMCtCHoHMAVWLIhKAMzSXKfBYan')
    this.setState({ results })
  }

  render () {
    let {results} = this.state
    if(results) {
      results = results.data.results.map(result => {
        const {id, title, cover_image} = result
        console.log(id, title, cover_image)
        return { id, title, cover_image }
      })
      results = results.map(result => (
        <Album
          isResults={true}
          key={result.id}
          user={this.props.user}
          id={result.id}
          title={result.title}
          cover_image={result.cover_image}
          className='album-thumb mb-auto m-1 display-box shadow'
        />
      ))
    }

    return (
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap justify-content-center">
          {results}
        </div>
      </div>
    )
  }
}

export default Results
