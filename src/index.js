import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { HashRouter } from 'react-router-dom'

const appWrapper = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appWrapper, document.getElementById('root'))

document.body.classList.add('bg-light')
