import { createContext, useContext, useState, useEffect } from 'react'

const ExpenseContext = createContext()

export const useExpense = () => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider')
  }
  return context
}

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })

  const [monthlyLimit, setMonthlyLimit] = useState(() => {
    const saved = localStorage.getItem('monthlyLimit')
    return saved ? parseFloat(saved) : 50000
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('monthlyLimit', monthlyLimit.toString())
  }, [monthlyLimit])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    setExpenses(prev => [newExpense, ...prev])
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id))
  }

  const getTotalExpenses = () => {
    return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  }

  const getMonthlyExpenses = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date)
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  }

  const getCategoryExpenses = () => {
    const categories = {}
    expenses.forEach(exp => {
      if (!categories[exp.category]) {
        categories[exp.category] = 0
      }
      categories[exp.category] += parseFloat(exp.amount)
    })
    return categories
  }

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      getTotalExpenses,
      getMonthlyExpenses,
      getCategoryExpenses,
      monthlyLimit,
      setMonthlyLimit
    }}>
      {children}
    </ExpenseContext.Provider>
  )
}
