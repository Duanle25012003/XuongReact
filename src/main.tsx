import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductProvider.tsx'
import { LoginProvider } from './context/LoginProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LoginProvider>
  <ProductProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ProductProvider>
  </LoginProvider>,
)
