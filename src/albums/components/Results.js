import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Album from './Album'
import '../styles/AlbumsIndex.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)

class Results extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: null
    }
  }

  render () {
    let {results} = this.props
    if(results) {
      results = results.data.results.map(result => {
        const {id, title, cover_image} = result
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
