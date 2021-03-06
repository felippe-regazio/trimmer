import React from 'react'
import ReactDOM from 'react-dom'
import Store from './context'
import './i18n/'
import App from './App'
import { ToastProvider } from 'react-toast-notifications';
import CssBaseline from '@material-ui/core/CssBaseline'
import 'fontsource-roboto'
import './resources/style/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    
    <Store>
      <ToastProvider autoDismissTimeout={10000}>
        <App />
      </ToastProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
