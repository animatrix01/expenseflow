import { motion } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { Target, Plus, TrendingUp, Trash2 } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function SavingsGoals({ onAddClick, onAddToSavings }) {
  const { savingsGoals, deleteSavingsGoal } = useFinance()

  const handleAddToSavings = (goal) => {
    const percentage = (goal.saved / goal.target) * 100
    if (percentage >= 100) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
    onAddToSavings(goal)
  }

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
            style={{ backgroundColor: '#10b981' + '20' }}
          >
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Savings Goals
          </h3>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {savingsGoals.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            No savings goals yet
          </p>
        ) : (
          savingsGoals.map((goal, index) => {
            const percentage = Math.min((goal.saved / goal.target) * 100, 100)
            const isComplete = percentage >= 100

            return (
              <motion.div
                key={goal.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {goal.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Saved: ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm font-bold px-2 py-1 rounded-lg"
                      style={{ 
                        backgroundColor: isComplete ? '#10b981' + '20' : 'var(--accent)' + '20',
                        color: isComplete ? '#10b981' : 'var(--accent)'
                      }}
                    >
                      {percentage.toFixed(0)}%
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteSavingsGoal(goal.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>

                <div className="relative h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: isComplete 
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : 'linear-gradient(90deg, #3b82f6, #10b981)'
                    }}
                  />
                </div>

                {!isComplete && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToSavings(goal)}
                    className="w-full py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: 'var(--accent)' + '20',
                      color: 'var(--accent)'
                    }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Add to Savings
                  </motion.button>
                )}

                {isComplete && (
                  <div className="text-center py-2 text-sm font-semibold text-green-500">
                    🎉 Goal Achieved!
                  </div>
                )}
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
          backgroundColor: '#10b981' + '20',
          color: '#10b981'
        }}
      >
        <Plus className="w-5 h-5" />
        Add Goal
      </motion.button>
    </motion.div>
  )
}
