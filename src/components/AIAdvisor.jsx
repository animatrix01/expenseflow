import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import { useFinance } from '../context/FinanceContext'
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Bell, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AIAdvisor() {
  const { expenses, getTotalExpenses, getMonthlyExpenses, getCategoryExpenses, monthlyLimit } = useExpense()
  const { bills, savingsGoals, subscriptions, getTotalSubscriptionCost } = useFinance()
  const [insights, setInsights] = useState([])

  useEffect(() => {
    generateInsights()
  }, [expenses, bills, savingsGoals, subscriptions, monthlyLimit])

  const generateInsights = () => {
    const newInsights = []
    const monthlyExpenses = getMonthlyExpenses()
    const categoryExpenses = getCategoryExpenses()
    const budgetPercentage = (monthlyExpenses / monthlyLimit) * 100
    const subscriptionCost = getTotalSubscriptionCost()

    // Budget warnings
    if (budgetPercentage >= 90) {
      newInsights.push({
        type: 'critical',
        icon: AlertTriangle,
        title: 'Budget Alert!',
        message: `You've used ${budgetPercentage.toFixed(0)}% of your monthly budget. Consider reducing spending.`,
        color: '#ef4444'
      })
    } else if (budgetPercentage >= 75) {
      newInsights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Approaching Limit',
        message: `You've spent ${budgetPercentage.toFixed(0)}% of your budget. You have ₹${(monthlyLimit - monthlyExpenses).toFixed(0)} left.`,
        color: '#f59e0b'
      })
    } else if (budgetPercentage < 50) {
      newInsights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Great Job!',
        message: `You're doing well! Only ${budgetPercentage.toFixed(0)}% of budget used. Keep it up!`,
        color: '#10b981'
      })
    }

    // Category overspending
    const avgCategorySpend = monthlyExpenses / Object.keys(categoryExpenses).length
    Object.entries(categoryExpenses).forEach(([category, amount]) => {
      if (amount > avgCategorySpend * 1.5) {
        newInsights.push({
          type: 'warning',
          icon: TrendingUp,
          title: `High ${category} Spending`,
          message: `You're spending ₹${amount.toFixed(0)} on ${category}. Consider reducing by 20% to save ₹${(amount * 0.2).toFixed(0)}.`,
          color: '#f59e0b'
        })
      }
    })

    // Spending pace prediction
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const currentDay = new Date().getDate()
    const dailyAverage = monthlyExpenses / currentDay
    const projectedSpending = dailyAverage * daysInMonth
    
    if (projectedSpending > monthlyLimit) {
      newInsights.push({
        type: 'critical',
        icon: TrendingUp,
        title: 'Spending Pace Warning',
        message: `At current pace, you'll spend ₹${projectedSpending.toFixed(0)} this month, exceeding your limit by ₹${(projectedSpending - monthlyLimit).toFixed(0)}.`,
        color: '#ef4444'
      })
    }

    // Upcoming bills
    const urgentBills = bills.filter(bill => {
      const daysUntil = Math.ceil((new Date(bill.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
      return daysUntil <= 3 && daysUntil >= 0
    })
    
    if (urgentBills.length > 0) {
      const totalUrgent = urgentBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
      newInsights.push({
        type: 'warning',
        icon: Bell,
        title: 'Urgent Bills',
        message: `${urgentBills.length} bill(s) due in 3 days. Total: ₹${totalUrgent.toFixed(0)}. Don't forget to pay!`,
        color: '#f59e0b'
      })
    }

    // Savings goals progress
    savingsGoals.forEach(goal => {
      const percentage = (goal.saved / goal.target) * 100
      const remaining = goal.target - goal.saved
      
      if (percentage >= 90) {
        newInsights.push({
          type: 'success',
          icon: Target,
          title: `Almost There: ${goal.name}`,
          message: `Only ₹${remaining.toFixed(0)} more to reach your goal! You're ${percentage.toFixed(0)}% there.`,
          color: '#10b981'
        })
      } else if (percentage < 30 && goal.saved > 0) {
        const monthsToGoal = Math.ceil(remaining / (monthlyLimit * 0.1))
        newInsights.push({
          type: 'info',
          icon: Target,
          title: `${goal.name} Progress`,
          message: `Save ₹${(monthlyLimit * 0.1).toFixed(0)}/month to reach your goal in ${monthsToGoal} months.`,
          color: '#3b82f6'
        })
      }
    })

    // Subscription optimization
    if (subscriptionCost > monthlyLimit * 0.15) {
      newInsights.push({
        type: 'warning',
        icon: TrendingDown,
        title: 'High Subscription Costs',
        message: `Subscriptions cost ₹${subscriptionCost}/month (${((subscriptionCost/monthlyLimit)*100).toFixed(0)}% of budget). Review and cancel unused ones.`,
        color: '#f59e0b'
      })
    }

    // Smart savings suggestion
    if (budgetPercentage < 70 && savingsGoals.length > 0) {
      const availableToSave = (monthlyLimit - monthlyExpenses) * 0.5
      newInsights.push({
        type: 'success',
        icon: Zap,
        title: 'Smart Savings Tip',
        message: `You have room to save! Consider adding ₹${availableToSave.toFixed(0)} to your savings goals this month.`,
        color: '#10b981'
      })
    }

    // If no insights, add a positive message
    if (newInsights.length === 0) {
      newInsights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'All Good!',
        message: 'Your finances look healthy. Keep tracking your expenses and stay on budget!',
        color: '#10b981'
      })
    }

    setInsights(newInsights.slice(0, 5)) // Limit to 5 insights
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl shadow-2xl glass-card relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        boxShadow: '0 20px 60px var(--shadow), 0 0 40px rgba(99, 102, 241, 0.1)'
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, var(--accent) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, var(--accent) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, var(--accent) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-full h-full"
        />
      </div>

      {/* Header with animated bot */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
          style={{ 
            background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
          }}
        >
          <Brain className="w-7 h-7 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
            style={{ 
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              filter: 'blur(10px)'
            }}
          />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            AI Spending Advisor
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Smart insights powered by your data
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3 relative z-10">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="p-4 rounded-2xl transition-all cursor-pointer"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: `4px solid ${insight.color}`
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: insight.color + '20' }}
              >
                <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  {insight.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {insight.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t relative z-10"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
          💡 Insights update automatically based on your spending
        </p>
      </motion.div>
    </motion.div>
  )
}
