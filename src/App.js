import React, { Fragment, Component } from 'react'

import './App.scss'

import { Route, Link, withRouter } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import NavBar from './header/Navbar.js'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Results from './albums/components/Results'
import Wishlist from './albums/components/Wishlist'
import AlbumShow from './albums/components/AlbumShow'
import MailerForm from './albums/components/MailerForm'
import LandingPage from './albums/components/LandingPage'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()

    this.state = {
      query: '',
      results: null,
      user: JSON.parse(sessionStorage.getItem('user')),
      flashMessage: '',
      flashType: null,
      isLoading: false
    }
  }

  setUser = user => {
    this.setState({ user })
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  clearUser = () => {
    this.setState({ user: null })
    sessionStorage.removeItem('user')
  }

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 1000)
  }

  onChangeQuery = (e) => this.setState({ query: e.target.value })

  onSearch = async (e) => {
    e.preventDefault()
    const {query} = this.state
    this.setState({
      isLoading: true
    }, () => console.log(this.state.results))
    const results = await axios(`https://api.discogs.com/database/search?q=${query}&type=master&token=NcoQgYPGBIypBlMCtCHoHMAVWLIhKAMzSXKfBYan`)
    this.setState({
      results,
      isLoading: false
    }, () => console.log(this.state.results))
    this.props.history.push('/results')
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <Fragment>
        {/* <Header
          query={this.state.query}
          onSearch={(e) => this.onSearch(e)}
          onChangeQuery={(e) => this.onChangeQuery(e)}
          user={user}
        /> */}
        <NavBar
          query={this.state.query}
          onSearch={(e) => this.onSearch(e)}
          onChangeQuery={(e) => this.onChangeQuery(e)}
          user={user}
        />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        <Route path='/results' query={this.state.query} render={() => (
          <Results
            isLoading={this.state.isLoading}
            flash={this.flash}
            query={this.state.query}
            onSearch={(e) => this.onSearch(e)}
            onChangeQuery={(e) => this.onChangeQuery(e)}
            results={this.state.results}
            user={user}
          />
        )} />
        <Route path='/wishlist' render={() => (
          <Wishlist flash={this.flash} user={user}/>
        )} />
        <Route path='/mailerform' render={() => (
          <MailerForm flash={this.flash} user={user}/>
        )} />
        <Route exact path='/' render={() => (
          <LandingPage flash={this.flash} user={user}/>
        )} />
        <Route path='/albumshow' component={AlbumShow} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
