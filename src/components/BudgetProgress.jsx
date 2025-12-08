import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'

export default function BudgetProgress({ percentage }) {
  const { monthlyLimit, getMonthlyExpenses } = useExpense()
  const monthlyExpenses = getMonthlyExpenses()

  const getColor = () => {
    if (percentage < 50) return '#10b981'
    if (percentage < 80) return '#f59e0b'
    return '#ef4444'
  }

  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-6 rounded-3xl shadow-lg glass-card"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
        Monthly Budget
      </h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="var(--border)"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="70"
              stroke={getColor()}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-4xl font-bold"
              style={{ color: getColor() }}
            >
              {percentage.toFixed(0)}%
            </motion.p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Used
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Spent</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            ₹{monthlyExpenses.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Budget</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            ₹{monthlyLimit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Remaining</span>
          <span className="font-semibold" style={{ color: getColor() }}>
            ₹{(monthlyLimit - monthlyExpenses).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
