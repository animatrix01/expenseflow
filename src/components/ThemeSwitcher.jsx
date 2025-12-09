import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Palette } from 'lucide-react'

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <Palette className="w-6 h-6" style={{ color: 'var(--accent)' }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 p-3 rounded-2xl shadow-2xl w-56 glass-card"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Choose Theme
            </p>
            <div className="space-y-2">
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTheme(t.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    theme === t.id ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: theme === t.id ? 'var(--accent)' : 'transparent',
                    color: theme === t.id ? 'white' : 'var(--text-primary)'
                  }}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm font-medium">{t.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
