import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import ThumbInfo from './ThumbInfo'

library.add(faStroopwafel)

// import './Album.scss'

class Album extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isActive: false
    }
  }
  // old way to show
  // onMouseEnter = (e) => e.currentTarget.children[0].classList.remove('d-none')

  // React way to show element onMouseOver
  onMouseEnter = (e) => {
    e.stopPropagation()
    this.setState((state, props) => ({
      isActive: true
    }))
  }

  // old way to hide
  // onMouseLeave = (e) => e.currentTarget.children[0].classList.add('d-none')

  // React way to hide element onMouseOut
  onMouseLeave = (e) => {
    this.setState((state, props) => ({
      isActive: false
    }))
  }

  render () {
    return (
      <div
        // use onMouseLeave and onMouseEnter instead of onMouseOver and onMouseOut
        // because the former only get called once while the latter will get called
        // when moving between descendants also. TLDR; fixes repeated firing
        onMouseLeave={(e) => this.onMouseLeave(e)}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        className="album-thumb mb-auto m-1 display-box shadow"
      >
        {(this.state.isActive) && <ThumbInfo />}
        {/* <div className={(!this.state.isActive) ? 'd-none' : ''}>
          <h6 className='mt-5 p-2 text-left text-white'>Abbey Road</h6>
          <p className='p-2 mb-2 text-left text-white'>Abbey Road is the eleventh studio album by English rock band the Beatles, released on 26 September 1969 by Apple Records.</p>
          <FontAwesomeIcon icon="stroopwafel" />
        </div> */}
      </div>
    )
  }
}

export default Album
