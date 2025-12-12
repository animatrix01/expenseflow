import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../context/FinanceContext'
import { Bell, Plus, Trash2, ArrowLeft, Calendar, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AddBillModal from '../components/AddBillModal'

export default function BillsPage() {
  const { bills, deleteBill } = useFinance()
  const [showBillModal, setShowBillModal] = useState(false)
  const navigate = useNavigate()

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

  const urgentBills = sortedBills.filter(bill => getDaysUntilDue(bill.dueDate) <= 3)
  const upcomingBills = sortedBills.filter(bill => getDaysUntilDue(bill.dueDate) > 3)
  const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0)

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
              📅 Upcoming Bills
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Never miss a payment deadline
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
                Total Bills
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {bills.length}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Total Amount
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                ₹{totalAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Urgent Bills
              </p>
              <p className="text-3xl font-bold text-red-500">
                {urgentBills.length}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Bill Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBillModal(true)}
          className="w-full md:w-auto px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          <Plus className="w-6 h-6" />
          Add New Bill
        </motion.button>

        {bills.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 rounded-3xl text-center glass-card"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No bills to track
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add your first bill reminder to get started!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Urgent Bills */}
            {urgentBills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold text-red-500">
                    Urgent (Due in 3 days or less)
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {urgentBills.map((bill, index) => {
                    const daysUntil = getDaysUntilDue(bill.dueDate)
                    return (
                      <motion.div
                        key={bill.id}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="p-6 rounded-3xl shadow-lg glass-card ring-2 ring-red-500 ring-opacity-50"
                        style={{ 
                          backgroundColor: 'var(--bg-card)',
                          boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-500 bg-opacity-20"
                          >
                            <Bell className="w-6 h-6 text-red-500" />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteBill(bill.id)}
                            className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </motion.button>
                        </div>

                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {bill.name}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Amount</span>
                            <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                              ₹{parseFloat(bill.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Due Date</span>
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {new Date(bill.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="px-4 py-2 rounded-xl bg-red-500 text-white text-center font-bold">
                          Due in {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Bills */}
            {upcomingBills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Upcoming Bills
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingBills.map((bill, index) => {
                    const daysUntil = getDaysUntilDue(bill.dueDate)
                    return (
                      <motion.div
                        key={bill.id}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="p-6 rounded-3xl shadow-lg glass-card"
                        style={{ backgroundColor: 'var(--bg-card)' }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: 'var(--accent)' + '20' }}
                          >
                            <Bell className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteBill(bill.id)}
                            className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </motion.button>
                        </div>

                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {bill.name}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Amount</span>
                            <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                              ₹{parseFloat(bill.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Due Date</span>
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {new Date(bill.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div 
                          className="px-4 py-2 rounded-xl text-center font-bold"
                          style={{ 
                            backgroundColor: 'var(--accent)' + '20',
                            color: 'var(--accent)'
                          }}
                        >
                          Due in {daysUntil} days
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {showBillModal && <AddBillModal onClose={() => setShowBillModal(false)} />}
      </AnimatePresence>
    </>
  )
}
