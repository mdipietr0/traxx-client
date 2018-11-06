import React, { Fragment, Component } from 'react'
import './App.scss'
import { Route, Link, withRouter } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import NavBar from './header/components/Navbar.js'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Results from './albums/components/Results'
import Wishlist from './albums/components/Wishlist'
import AlbumShow from './albums/components/AlbumShow'
import MailerForm from './albums/components/MailerForm'
import LandingPage from './albums/components/LandingPage'
import { search } from './api.js'

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
    })
    const results = await search(query)
    this.setState({
      results,
      isLoading: false
    })
    this.props.history.push('/results')
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <Fragment>
        <NavBar
          query={this.state.query}
          onSearch={(e) => this.onSearch(e)}
          onChangeQuery={(e) => this.onChangeQuery(e)}
          user={user}
        />
        {flashMessage && <h3 className={flashType + ' fixed-top w-25 mx-auto text-center'}>{flashMessage}</h3>}

        <main>
          <Route exact path='/' render={() => (
            <LandingPage flash={this.flash} user={user}/>
          )} />
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
          <Route path='/albumshow' component={AlbumShow} />
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
