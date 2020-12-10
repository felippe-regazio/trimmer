import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'fontsource-roboto'
import './style/main.scss'


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
