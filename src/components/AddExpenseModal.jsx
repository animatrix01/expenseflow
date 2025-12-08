import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import { X } from 'lucide-react'

const categories = ['Food', 'Groceries', 'Travel', 'Fun', 'Shopping', 'Education']

export default function AddExpenseModal({ onClose }) {
  const { addExpense } = useExpense()
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.amount && formData.category) {
      addExpense(formData)
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-8 rounded-3xl shadow-2xl glass-card"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Add Expense
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <X className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Amount
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    formData.category === cat ? 'shadow-lg' : ''
                  }`}
                  style={{
                    backgroundColor: formData.category === cat ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: formData.category === cat ? 'white' : 'var(--text-primary)'
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Date
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Notes (Optional)
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all resize-none"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              rows="3"
              placeholder="Add a note..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Add Expense
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
