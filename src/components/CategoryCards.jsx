import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import { ShoppingBag, Coffee, Car, Sparkles, GraduationCap, ShoppingCart } from 'lucide-react'

const categoryConfig = {
  Food: { icon: Coffee, color: '#ef4444', gradient: 'from-red-400 to-red-600' },
  Groceries: { icon: ShoppingCart, color: '#10b981', gradient: 'from-green-400 to-green-600' },
  Travel: { icon: Car, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600' },
  Fun: { icon: Sparkles, color: '#f59e0b', gradient: 'from-amber-400 to-amber-600' },
  Shopping: { icon: ShoppingBag, color: '#a855f7', gradient: 'from-purple-400 to-purple-600' },
  Education: { icon: GraduationCap, color: '#06b6d4', gradient: 'from-cyan-400 to-cyan-600' },
}

export default function CategoryCards() {
  const { getCategoryExpenses } = useExpense()
  const categoryExpenses = getCategoryExpenses()

  return (
    <div className="p-6 rounded-3xl shadow-lg glass-card" style={{ backgroundColor: 'var(--bg-card)' }}>
      <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
        Categories
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categoryConfig).map(([category, config], index) => {
          const Icon = config.icon
          const amount = categoryExpenses[category] || 0

          return (
            <motion.div
              key={category}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 20px 40px ${config.color}40`,
                y: -5
              }}
              className="p-4 rounded-2xl cursor-pointer"
              style={{ 
                backgroundColor: config.color + '15',
                border: `2px solid ${config.color}30`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: config.color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                {category}
              </p>
              <p className="text-xl font-bold" style={{ color: config.color }}>
                ₹{amount.toFixed(2)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
