import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { X } from 'lucide-react'

export default function AddGoalModal({ onClose }) {
  const { addSavingsGoal } = useFinance()
  const [formData, setFormData] = useState({
    name: '',
    target: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.target) {
      addSavingsGoal({ ...formData, target: parseFloat(formData.target) })
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
            Add Savings Goal
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
              Goal Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="e.g., Laptop Upgrade"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Target Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="0.00"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg"
            style={{ backgroundColor: '#10b981' }}
          >
            Create Goal
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
