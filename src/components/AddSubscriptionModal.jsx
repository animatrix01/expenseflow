import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { X } from 'lucide-react'

const iconOptions = ['🎬', '🎵', '☁️', '📺', '🎮', '📱', '💻', '📚', '🏋️', '🍕']

export default function AddSubscriptionModal({ onClose }) {
  const { addSubscription } = useFinance()
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    renewalDay: '',
    icon: '🎬'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.amount && formData.renewalDay) {
      addSubscription({
        ...formData,
        amount: parseFloat(formData.amount),
        renewalDay: parseInt(formData.renewalDay)
      })
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
            Add Subscription
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
              Service Name
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
              placeholder="e.g., Netflix"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Monthly Amount (₹)
            </label>
            <input
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
              Renewal Day (1-31)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              required
              value={formData.renewalDay}
              onChange={(e) => setFormData({ ...formData, renewalDay: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="e.g., 15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((icon) => (
                <motion.button
                  key={icon}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 rounded-xl text-2xl transition-all ${
                    formData.icon === icon ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: formData.icon === icon ? 'var(--accent)' + '30' : 'var(--bg-secondary)',
                    ringColor: 'var(--accent)'
                  }}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg"
            style={{ backgroundColor: '#a855f7' }}
          >
            Add Subscription
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
