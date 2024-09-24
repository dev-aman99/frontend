import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import AuthProvider from './store/auth'

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </Provider>,
)
