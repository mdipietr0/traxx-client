import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Jumbotron, Row, Col, Container } from 'reactstrap'
import '../styles/LandingPage.scss'

const LandingPage = () => (
  <Fragment>
    <Jumbotron fluid className='recordbg text-center'>
      <div className='p-4 m-4'>
        <h2 className='display-4 mx-5 mt-5 text-light text-shadow'>Discover new albums and track your wishlist</h2>
        <h4 className='lead mx-5 mb-5 text-light'>Search for an album to begin</h4>
      </div>
    </Jumbotron>
    <Container>
      <Row>
        <Col md="4">
          <h4 className='text-dark text-center'>Discover</h4>
          <p className='text-justify'>Find old favorites or discover new ones! Traxx uses the Discogs API to search over 10 million albums by over 5 million different artists.</p>
        </Col>
        <Col md="4">
          <h4 className='text-dark text-center'>Track</h4>
          <p className='text-justify'>You can create and share a wishlist and keep track of all your most wanted albums.</p>
        </Col>
        <Col md="4">
          <h4 className='text-dark text-center'>Share</h4>
          <p className='text-justify'>Your family and friends will know exactly what to get you!
            To begin creating your wishlist, <Link to='/sign-in'>Sign In</Link> or <Link to='/sign-up'>Create an Account</Link>!
            Just click the add to wishlist icon button on each album.
          </p>
        </Col>
      </Row>
    </Container>
  </Fragment>
)

export default withRouter(LandingPage)
