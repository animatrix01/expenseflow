import { createContext, useContext, useState, useEffect } from 'react'

const FinanceContext = createContext()

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return context
}

export const FinanceProvider = ({ children }) => {
  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem('bills')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Electricity Bill', amount: 850, dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 2, name: 'Mobile Recharge', amount: 199, dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 3, name: 'Rent', amount: 7500, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() },
    ]
  })

  const [savingsGoals, setSavingsGoals] = useState(() => {
    const saved = localStorage.getItem('savingsGoals')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Laptop Upgrade', target: 80000, saved: 25000 },
      { id: 2, name: 'Vacation Fund', target: 50000, saved: 12000 },
    ]
  })

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Netflix', amount: 649, renewalDay: 20, icon: '🎬' },
      { id: 2, name: 'Spotify', amount: 119, renewalDay: 7, icon: '🎵' },
      { id: 3, name: 'Apple iCloud', amount: 75, renewalDay: 1, icon: '☁️' },
    ]
  })

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills))
  }, [bills])

  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals))
  }, [savingsGoals])

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
  }, [subscriptions])

  const addBill = (bill) => {
    const newBill = { ...bill, id: Date.now() }
    setBills(prev => [...prev, newBill])
  }

  const deleteBill = (id) => {
    setBills(prev => prev.filter(bill => bill.id !== id))
  }

  const addSavingsGoal = (goal) => {
    const newGoal = { ...goal, id: Date.now(), saved: 0 }
    setSavingsGoals(prev => [...prev, newGoal])
  }

  const updateSavingsGoal = (id, amount) => {
    setSavingsGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, saved: Math.min(goal.saved + amount, goal.target) } : goal
    ))
  }

  const deleteSavingsGoal = (id) => {
    setSavingsGoals(prev => prev.filter(goal => goal.id !== id))
  }

  const addSubscription = (subscription) => {
    const newSub = { ...subscription, id: Date.now() }
    setSubscriptions(prev => [...prev, newSub])
  }

  const deleteSubscription = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id))
  }

  const getTotalSubscriptionCost = () => {
    return subscriptions.reduce((sum, sub) => sum + sub.amount, 0)
  }

  return (
    <FinanceContext.Provider value={{
      bills,
      addBill,
      deleteBill,
      savingsGoals,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      subscriptions,
      addSubscription,
      deleteSubscription,
      getTotalSubscriptionCost
    }}>
      {children}
    </FinanceContext.Provider>
  )
}
