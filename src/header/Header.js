import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    {/*TODO Add class active to active element*/}
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
  <Link to="/" className="navbar-brand">Traxx</Link>
)

const Header = ({ user }) => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light border border-bottom shadow-sm">
      {navbarBrand}
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
