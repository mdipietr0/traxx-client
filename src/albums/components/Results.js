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

  // async componentDidMount() {
  //   const { query } = this.props
  //   console.log(query)
  //   // one word query allowed
  //   const results = await axios(`https://api.discogs.com/database/search?q=${query}&type=master&token=NcoQgYPGBIypBlMCtCHoHMAVWLIhKAMzSXKfBYan`)
  //   this.setState({ results })
  // }

  render () {
    let {results} = this.props
    if(results) {
      results = results.data.results.map(result => {
        const {id, title, cover_image} = result

        console.log(id, title, cover_image)
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

    // const SearchBar = ({query, onChangeQuery, onSearch}) => (
    //   <form className="form-inline my-2 my-lg-0">
    //     <div className='mx-auto'>
    //       <input
    //         autoFocus
    //         value={query}
    //         onChange={onChangeQuery}
    //         className="form-control rounded-0 btn-outline-dark"
    //         type="search"
    //         placeholder="Search Albums"
    //         aria-label="Search"
    //       />
    //
    //       <button className="rounded-0 btn btn-outline-dark my-2 my-sm-0" type="submit">
    //         <FontAwesomeIcon
    //           onClick={onSearch}
    //           title="Search"
    //           color='black'
    //           icon={['fas', 'search']}
    //         />
    //       </button>
    //     </div>
    //   </form>
    // )
    //
    // const {onSearch, query, onChangeQuery} = this.props

    return (
      <div className="container-fluid mt-5">
        {/* <SearchBar onSearch={onSearch} query={query} onChangeQuery={onChangeQuery} /> */}
        <div className="d-flex flex-wrap justify-content-center">
          {results}
        </div>
      </div>
    )
  }
}

export default Results
