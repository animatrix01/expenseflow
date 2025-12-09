import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, title, value, trend, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-3xl shadow-lg glass-card"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: 'var(--accent)' + '20',
            color: 'var(--accent)'
          }}
        >
          {trend}
        </span>
      </div>
      <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
        {title}
      </p>
      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </motion.div>
  )
}
