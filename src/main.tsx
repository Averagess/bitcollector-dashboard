import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import Login from './pages/Login'
import "./main.css"

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
