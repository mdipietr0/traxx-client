import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
} from 'reactstrap'
import {
  unauthenticatedOptions,
  authenticatedOptions} from './navLinks'
import './Navbar.scss'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { onSearch, onChangeQuery, query, user } = this.props
    return (
      <Navbar className='fixed-top bg-light border border-bottom shadow-sm py-0' color="inverse" light expand="md">
        <NavbarBrand tag='div'>
          <Link to="/" className="navbar-brand">
            <img src='traxx.png' width='200px;' alt='logo' />
          </Link>
        </NavbarBrand>
        <SearchBar onSearch={onSearch} query={query} onChangeQuery={onChangeQuery} />
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            { user ? authenticatedOptions : unauthenticatedOptions }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavBar
