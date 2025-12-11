import { motion } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { Bell, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function UpcomingBills({ onAddClick }) {
  const { bills, deleteBill } = useFinance()

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const sortedBills = [...bills].sort((a, b) => 
    getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl shadow-lg glass-card"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' + '20' }}
          >
            <Bell className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Upcoming Bills
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {sortedBills.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            No upcoming bills
          </p>
        ) : (
          sortedBills.map((bill, index) => {
            const daysUntil = getDaysUntilDue(bill.dueDate)
            const isUrgent = daysUntil <= 3

            return (
              <motion.div
                key={bill.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-xl transition-all ${
                  isUrgent ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                }`}
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  boxShadow: isUrgent ? '0 0 20px rgba(239, 68, 68, 0.3)' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {bill.name}
                    </p>
                    <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>
                      ₹{bill.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isUrgent ? 'bg-red-500 text-white' : 'bg-blue-500 bg-opacity-20'
                      }`}
                      style={{ color: isUrgent ? 'white' : 'var(--accent)' }}
                    >
                      {daysUntil}d
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteBill(bill.id)}
                      className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddClick}
        className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
        style={{ 
          backgroundColor: 'var(--accent)' + '20',
          color: 'var(--accent)'
        }}
      >
        <Plus className="w-5 h-5" />
        Add Reminder
      </motion.button>
    </motion.div>
  )
}
