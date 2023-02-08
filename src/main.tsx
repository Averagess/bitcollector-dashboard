import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./main.css"


console.log(`APP RUNNING IN ${import.meta.env.MODE} MODE`)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
