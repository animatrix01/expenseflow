import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ExpenseProvider } from './context/ExpenseContext'
import { ThemeProvider } from './context/ThemeContext'
import { FinanceProvider } from './context/FinanceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ExpenseProvider>
        <FinanceProvider>
          <App />
        </FinanceProvider>
      </ExpenseProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
