import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ExpenseChart() {
  const { expenses } = useExpense()

  // Get last 7 days data
  const getLast7DaysData = () => {
    const data = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayExpenses = expenses
        .filter(exp => exp.date === dateStr)
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
      
      data.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: dayExpenses
      })
    }
    
    return data
  }

  const data = getLast7DaysData()

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="px-4 py-2 rounded-xl shadow-lg"
          style={{ 
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent)',
            color: 'var(--text-primary)'
          }}
        >
          <p className="font-semibold" style={{ color: 'var(--accent)' }}>
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl shadow-lg glass-card overflow-hidden"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
        Weekly Overview
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis 
            dataKey="day" 
            stroke="var(--text-secondary)"
            style={{ fontSize: '12px' }}
            tickLine={false}
          />
          <YAxis 
            stroke="var(--text-secondary)"
            style={{ fontSize: '12px' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--border)', opacity: 0.2 }} />
          <Bar 
            dataKey="amount" 
            fill="var(--accent)" 
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
