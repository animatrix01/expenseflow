import { motion } from 'framer-motion'
import { useExpense } from '../context/ExpenseContext'
import StatsCard from './StatsCard'
import BudgetProgress from './BudgetProgress'
import CategoryCards from './CategoryCards'
import ExpenseChart from './ExpenseChart'
import RecentExpenses from './RecentExpenses'
import AIAdvisor from './AIAdvisor'
import { DollarSign, TrendingUp, Calendar } from 'lucide-react'

export default function Dashboard() {
  const { getTotalExpenses, getMonthlyExpenses, monthlyLimit } = useExpense()

  const totalExpenses = getTotalExpenses()
  const monthlyExpenses = getMonthlyExpenses()
  const budgetPercentage = (monthlyExpenses / monthlyLimit) * 100

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Welcome back! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Here's your expense overview
        </p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={DollarSign}
          title="Total Expenses"
          value={`₹${totalExpenses.toFixed(2)}`}
          trend="+12.5%"
          color="var(--accent)"
        />
        <StatsCard
          icon={Calendar}
          title="This Month"
          value={`₹${monthlyExpenses.toFixed(2)}`}
          trend="+8.2%"
          color="#10b981"
        />
        <StatsCard
          icon={TrendingUp}
          title="Budget Left"
          value={`₹${(monthlyLimit - monthlyExpenses).toFixed(2)}`}
          trend={`${(100 - budgetPercentage).toFixed(1)}%`}
          color="#f59e0b"
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ExpenseChart />
          <CategoryCards />
        </div>
        <div className="space-y-6">
          <BudgetProgress percentage={budgetPercentage} />
          <AIAdvisor />
          <RecentExpenses />
        </div>
      </motion.div>
    </motion.div>
  )
}
