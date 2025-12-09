import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Target, Bell, CreditCard } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard', path: '/' },
  { icon: Target, label: 'Savings Goals', id: 'savings', path: '/savings' },
  { icon: Bell, label: 'Bills', id: 'bills', path: '/bills' },
  { icon: CreditCard, label: 'Subscriptions', id: 'subscriptions', path: '/subscriptions' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleItemClick = (item) => {
    navigate(item.path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-0 h-screen w-20 lg:w-64 z-30"
        style={{ backgroundColor: 'var(--bg-card)', boxShadow: '2px 0 10px var(--shadow)' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 text-center lg:text-left">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-2xl font-bold gradient-text hidden lg:block cursor-pointer"
              onClick={() => navigate('/')}
            >
              ExpenseFlow
            </motion.h1>
            <motion.div 
              className="lg:hidden text-2xl cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
            >
              💰
            </motion.div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                  isActive(item.path) 
                    ? 'shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: isActive(item.path) ? 'var(--accent)' : 'transparent',
                  color: isActive(item.path) ? 'white' : 'var(--text-secondary)'
                }}
              >
                <item.icon className="w-6 h-6" />
                <span className="hidden lg:block font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-white hidden lg:block"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl hidden lg:block"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Pro Tip 💡
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Track daily expenses to stay within budget!
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}
