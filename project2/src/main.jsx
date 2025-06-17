// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Login />

  </BrowserRouter>
)
