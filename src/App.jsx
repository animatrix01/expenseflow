import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import SavingsGoalsPage from './pages/SavingsGoalsPage'
import BillsPage from './pages/BillsPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import AddExpenseModal from './components/AddExpenseModal'
import ThemeSwitcher from './components/ThemeSwitcher'
import { Plus } from 'lucide-react'

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname === '/'

  return (
    <>
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8 ml-20 lg:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/savings" element={<SavingsGoalsPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
          </Routes>
          
          {isDashboard && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-40"
              style={{ 
                backgroundColor: 'var(--accent)',
                boxShadow: '0 10px 40px var(--shadow)'
              }}
            >
              <Plus className="w-8 h-8 text-white" />
            </motion.button>
          )}

          <div className="fixed top-8 right-8 z-40">
            <ThemeSwitcher />
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddExpenseModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <AppContent />
      </div>
    </Router>
  )
}

export default App
