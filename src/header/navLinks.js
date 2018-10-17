import React, {Fragment } from 'react'
import { NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const unauthenticatedOptions = (
  <Fragment>
    {/*TODO Add class active to active element*/}
    <NavItem>
      <Link className='nav-link' to='/sign-up'>
          Sign Up
      </Link>
    </NavItem>
    <NavItem>
      <Link className='nav-link' to='/sign-in'>
          Sign In
      </Link>
    </NavItem>
  </Fragment>
)

const authenticatedOptions = (
  <Fragment>
    {/*TODO Add class active to active element*/}
    <NavItem>
      <Link className="nav-link" to="/wishlist">
          My Wishlist
      </Link>
    </NavItem>
    <NavItem>
      <Link className='nav-link' to='/change-password'>
          Change Password
      </Link>
    </NavItem>
    <NavItem>
      <Link className='nav-link' to='/sign-out'>
          Sign Out
      </Link>
    </NavItem>
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
  </Fragment>
)

export { authenticatedOptions, unauthenticatedOptions }
