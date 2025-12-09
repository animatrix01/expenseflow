import { motion } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { CreditCard, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function SubscriptionTracker({ onAddClick }) {
  const { subscriptions, deleteSubscription, getTotalSubscriptionCost } = useFinance()
  const [isExpanded, setIsExpanded] = useState(true)

  const totalCost = getTotalSubscriptionCost()

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
            style={{ backgroundColor: '#a855f7' + '20' }}
          >
            <CreditCard className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Subscriptions
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Total: ₹{totalCost}/month
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 rounded-lg"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          )}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-3 mb-4">
          {subscriptions.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
              No subscriptions tracked
            </p>
          ) : (
            subscriptions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 2,
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
                }}
                className="p-4 rounded-xl transition-all"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-2xl">{sub.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                        {sub.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Renews {sub.renewalDay}th
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                        ₹{sub.amount}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        /month
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteSubscription(sub.id)}
                      className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddClick}
          className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
          style={{ 
            backgroundColor: '#a855f7' + '20',
            color: '#a855f7'
          }}
        >
          <Plus className="w-5 h-5" />
          Add Subscription
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
