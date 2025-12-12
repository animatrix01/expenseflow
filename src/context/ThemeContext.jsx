import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const themes = [
  { id: 'light', name: 'Light Minimal', icon: '☀️' },
  { id: 'midnight', name: 'Midnight Aura', icon: '🌙' },
  { id: 'sage', name: 'Sage Calm', icon: '🌿' },
  { id: 'sakura', name: 'Sakura Pink', icon: '🌸' },
  { id: 'cyber', name: 'Cyber Purple', icon: '🔮' },
]

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}
