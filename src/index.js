import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { HashRouter } from 'react-router-dom'

const appWrapper = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appWrapper, document.getElementById('root'))

document.body.classList.add('bg-light')
document.body.classList.add('pt-5')
document.body.classList.add('mt-5')
document.body.classList.add('unselectable')
