import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { Target, Plus, TrendingUp, Trash2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AddGoalModal from '../components/AddGoalModal'
import AddToSavingsModal from '../components/AddToSavingsModal'
import confetti from 'canvas-confetti'

export default function SavingsGoalsPage() {
  const { savingsGoals, deleteSavingsGoal } = useFinance()
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showAddToSavingsModal, setShowAddToSavingsModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const navigate = useNavigate()

  const handleAddToSavings = (goal) => {
    setSelectedGoal(goal)
    setShowAddToSavingsModal(true)
    const percentage = (goal.saved / goal.target) * 100
    if (percentage >= 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.saved, 0)
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="p-3 rounded-2xl"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <ArrowLeft className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
          </motion.button>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              💰 Savings Goals
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Track and achieve your financial goals
            </p>
          </div>
        </div>

        {/* Overview Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 rounded-3xl shadow-lg glass-card"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Total Saved
              </p>
              <p className="text-3xl font-bold" style={{ color: '#10b981' }}>
                ₹{totalSaved.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Total Target
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                ₹{totalTarget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Overall Progress
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                {overallProgress.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Goal Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowGoalModal(true)}
          className="w-full md:w-auto px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg"
          style={{ backgroundColor: '#10b981', color: 'white' }}
        >
          <Plus className="w-6 h-6" />
          Create New Goal
        </motion.button>

        {/* Goals Grid */}
        {savingsGoals.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 rounded-3xl text-center glass-card"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Target className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No savings goals yet
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Create your first goal to start saving!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsGoals.map((goal, index) => {
              const percentage = Math.min((goal.saved / goal.target) * 100, 100)
              const isComplete = percentage >= 100

              return (
                <motion.div
                  key={goal.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-3xl shadow-lg glass-card"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: isComplete ? '#10b981' + '20' : 'var(--accent)' + '20' }}
                    >
                      <Target className="w-6 h-6" style={{ color: isComplete ? '#10b981' : 'var(--accent)' }} />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteSavingsGoal(goal.id)}
                      className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </motion.button>
                  </div>

                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {goal.name}
                  </h3>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                      <span 
                        className="font-bold"
                        style={{ color: isComplete ? '#10b981' : 'var(--accent)' }}
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
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
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Saved</span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        ₹{goal.saved.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Target</span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        ₹{goal.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Remaining</span>
                      <span className="font-semibold" style={{ color: isComplete ? '#10b981' : 'var(--accent)' }}>
                        ₹{Math.max(0, goal.target - goal.saved).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {!isComplete ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToSavings(goal)}
                      className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--accent)' + '20',
                        color: 'var(--accent)'
                      }}
                    >
                      <TrendingUp className="w-5 h-5" />
                      Add to Savings
                    </motion.button>
                  ) : (
                    <div className="text-center py-3 text-sm font-semibold text-green-500 bg-green-500 bg-opacity-10 rounded-xl">
                      🎉 Goal Achieved!
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showGoalModal && <AddGoalModal onClose={() => setShowGoalModal(false)} />}
        {showAddToSavingsModal && selectedGoal && (
          <AddToSavingsModal 
            goal={selectedGoal} 
            onClose={() => {
              setShowAddToSavingsModal(false)
              setSelectedGoal(null)
            }} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
