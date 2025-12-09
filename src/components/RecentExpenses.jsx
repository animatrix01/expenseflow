import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import { Trash2 } from 'lucide-react'

export default function RecentExpenses() {
  const { expenses, deleteExpense } = useExpense()
  const recentExpenses = expenses.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl shadow-lg glass-card"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Recent Expenses
      </h3>
      <div className="space-y-3">
        {recentExpenses.length === 0 ? (
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No expenses yet
          </p>
        ) : (
          recentExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  {expense.category}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold" style={{ color: 'var(--accent)' }}>
                  ₹{parseFloat(expense.amount).toFixed(2)}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteExpense(expense.id)}
                  className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
