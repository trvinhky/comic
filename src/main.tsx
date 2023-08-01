import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AppStore from './store/AppContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppStore>
        <App />
      </AppStore>
    </Router>
  </React.StrictMode>,
)
