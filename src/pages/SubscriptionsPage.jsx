import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { CreditCard, Plus, Trash2, ArrowLeft, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AddSubscriptionModal from '../components/AddSubscriptionModal'

export default function SubscriptionsPage() {
  const { subscriptions, deleteSubscription, getTotalSubscriptionCost } = useFinance()
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const navigate = useNavigate()

  const totalCost = getTotalSubscriptionCost()
  const yearlyTotal = totalCost * 12

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
              💳 Subscriptions
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage all your recurring payments
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
                Active Subscriptions
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {subscriptions.length}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Monthly Cost
              </p>
              <p className="text-3xl font-bold text-purple-500">
                ₹{totalCost.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Yearly Cost
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                ₹{yearlyTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Subscription Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSubscriptionModal(true)}
          className="w-full md:w-auto px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg"
          style={{ backgroundColor: '#a855f7', color: 'white' }}
        >
          <Plus className="w-6 h-6" />
          Add Subscription
        </motion.button>

        {/* Subscriptions Grid */}
        {subscriptions.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 rounded-3xl text-center glass-card"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No subscriptions tracked
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add your first subscription to start tracking!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ y: 20, opacity: 0, rotateY: -10 }}
                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  rotateY: 2,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)'
                }}
                className="p-6 rounded-3xl shadow-lg glass-card"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{sub.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {sub.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Renews {sub.renewalDay}th
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteSubscription(sub.id)}
                    className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Monthly Cost
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-purple-500">
                        ₹{sub.amount}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        per month
                      </p>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>Yearly Cost</span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        ₹{(sub.amount * 12).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-xl text-center"
                    style={{ 
                      backgroundColor: '#a855f7' + '20',
                      color: '#a855f7'
                    }}
                  >
                    <p className="text-xs font-medium">
                      Next renewal: {sub.renewalDay}th of next month
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cost Breakdown */}
        {subscriptions.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl shadow-lg glass-card"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Cost Breakdown
              </h3>
            </div>
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sub.icon}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{sub.name}</span>
                  </div>
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                    ₹{sub.amount}/mo
                  </span>
                </div>
              ))}
              <div 
                className="pt-3 mt-3 flex items-center justify-between font-bold text-lg"
                style={{ borderTop: '2px solid var(--border)' }}
              >
                <span style={{ color: 'var(--text-primary)' }}>Total Monthly</span>
                <span className="text-purple-500">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showSubscriptionModal && <AddSubscriptionModal onClose={() => setShowSubscriptionModal(false)} />}
      </AnimatePresence>
    </>
  )
}
