import React from 'react'
import ReactDOM from 'react-dom'
import Store from './context'
import App from './App'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'fontsource-roboto'
import './style/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
