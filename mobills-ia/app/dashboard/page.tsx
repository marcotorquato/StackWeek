import { auth } from '@clerk/nextjs/server'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BitcoinIcon,
  BuildingIcon,
  DollarSignIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  WalletIcon,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import { Card } from '../_components/ui/card'
import { db } from '../_lib/prisma'
import DashboardCard from './_components/DashboardCards'
import TransactionCard from './_components/TransactionCard'

const DashboardPage = async () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value)
  }
  // Obtendo as transações do banco de dados
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  })

  // Calculando os totais
  const totalIncomes = transactions
    .filter((transaction) => transaction.type === 'DEPOSIT')
    .reduce((sum, transaction) => sum + transaction.amount.toNumber(), 0)

  const totalInvested = transactions
    .filter((transaction) => transaction.type === 'INVESTMENT')
    .reduce((sum, transaction) => sum + transaction.amount.toNumber(), 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + transaction.amount.toNumber(), 0)

  // Processando as transações para exibição na lista
  const processedTransactions = transactions.map((transaction) => {
    const isPositive = transaction.type === 'DEPOSIT'
    const icon =
      transaction.name === 'Salary' ? (
        <DollarSignIcon className="w-4 h-4" />
      ) : transaction.name === 'Bitcoin' ? (
        <BitcoinIcon className="w-4 h-4" />
      ) : transaction.name === 'Gym' ? (
        <GraduationCapIcon className="w-4 h-4" />
      ) : transaction.name === 'Rent' ? (
        <HomeIcon className="w-4 h-4" />
      ) : (
        <BuildingIcon className="w-4 h-4" />
      )

    return {
      icon,
      name: transaction.name,
      date: transaction.date,
      amount: `${isPositive ? '+' : '-'}€ ${transaction.amount}`,
      positive: isPositive,
    }
  })

  return (
    <div className="p-6 min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="bg-primary/30 text-primary px-4 py-2 rounded-lg">
              AI Report
            </button>
            <select className="bg-background border rounded-lg px-4 py-2">
              <option>November</option>
            </select>
          </div>
        </div>

        <DashboardCard
          icon={<WalletIcon className="w-4 h-4" />}
          title="Balance"
          amount={formatCurrency(totalIncomes - totalExpenses - totalInvested)}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            icon={<LayersIcon className="w-4 h-4" />}
            title="Invested"
            amount={formatCurrency(totalInvested)}
          />
          <DashboardCard
            icon={<ArrowUpIcon className="w-4 h-4 text-green-500" />}
            title="Incomes"
            amount={formatCurrency(totalIncomes)}
            valueColor="text-green-500"
          />
          <DashboardCard
            icon={<ArrowDownIcon className="w-4 h-4 text-red-500" />}
            title="Expenses"
            amount={formatCurrency(totalExpenses)}
            valueColor="text-red-500"
          />
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Transactions</h2>
            <button className="text-sm text-primary">See More</button>
          </div>
          <div className="space-y-4">
            {processedTransactions.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
