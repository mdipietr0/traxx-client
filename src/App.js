import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Results from './albums/components/Results'
import Wishlist from './albums/components/Wishlist'
import AlbumShow from './albums/components/AlbumShow'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()

    this.state = {
      query: '',
      results: null,
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  onChangeQuery = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  onSearch = async (e) => {
    // move api call here and set state of results
    // pass results state as prop to results
    const {query} = this.state
    e.preventDefault()
    const results = await axios(`https://api.discogs.com/database/search?q=${query}&type=master&token=NcoQgYPGBIypBlMCtCHoHMAVWLIhKAMzSXKfBYan`)
    console.log(results)
    this.setState({ results })
    this.props.history.push('/results')
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header
          query={this.state.query}
          onSearch={(e) => this.onSearch(e)}
          onChangeQuery={(e) => this.onChangeQuery(e)}
          user={user}
        />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        <Route path='/results' query={this.state.query} render={() => (
          <Results
            query={this.state.query}
            onSearch={(e) => this.onSearch(e)}
            onChangeQuery={(e) => this.onChangeQuery(e)}
            results={this.state.results}
            user={user}
          />
        )} />
        <Route path='/wishlist' render={() => (
          <Wishlist user={user}/>
        )} />
        <Route path='/albumshow' component={AlbumShow} />
        {/* <Route path='/albumshow' render={(props) => (
          <AlbumShow
            user={user}/>
        )} /> */}
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
      </React.Fragment>
    )
  }
}

export default withRouter(App)
