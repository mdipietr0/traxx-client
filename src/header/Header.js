import React from 'react'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    {/*TODO Add class active to active element*/}
    <li className="nav-item">
      <Link to="/wishlist" className="nav-link">My Wishlist</Link>
    </li>
    <li className="nav-item">
      <Link to="/change-password" className="nav-link">Change Password <span className="sr-only">(current)</span></Link>
    </li>
    <li className="nav-item">
      <Link to="/sign-out" className="nav-link">Sign Out</Link>
    </li>
    {/*TODO Utilize dropdown for autenticated user option*/}
    {/* <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </li> */}
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    {/*TODO Add class active to active element*/}
    <li className="nav-item">
      <Link to="/sign-up" className="nav-link">Sign Up </Link>
    </li>
    <li className="nav-item">
      <Link to="/sign-in" className="nav-link">Sign In</Link>
    </li>
  </React.Fragment>
)

const navbarBrand = (
  <Link to="/" className="navbar-brand">
    <img src='traxx.png' className='' width='200px;' alt='logo' />
  </Link>
)

const SearchBar = ({query, onChangeQuery, onSearch}) => (
  <form className="form-inline my-2 my-lg-0">
    <div className='mx-auto'>
      <input
        autoFocus
        value={query}
        onChange={onChangeQuery}
        className="form-control rounded-0"
        type="search"
        placeholder="Search Albums"
        aria-label="Search"
      />

      <button className="rounded-0 btn my-2 my-sm-0 btn-outline-light" type="submit">
        <FontAwesomeIcon
          onClick={onSearch}
          title="Search"
          color='black'
          icon={['fas', 'search']}
        />
      </button>
    </div>
  </form>
)

const Header = ({ onSearch, onChangeQuery, query, user }) => (
  <header>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light border border-bottom shadow-sm py-0">
      {navbarBrand}
      <SearchBar onSearch={onSearch} query={query} onChangeQuery={onChangeQuery} />

      {/* TODO Implement custom collapse */}
      {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className='nav-item'>
            { user && <span className='nav-link'>Welcome, {user.email}</span>}
          </li>
          { user ? authenticatedOptions : unauthenticatedOptions }
        </ul>
      </div>
    </nav>
  </header>
)

export default Header
