import {
  ArrowDownIcon,
  ArrowUpIcon,
  LayersIcon,
  WalletIcon,
} from 'lucide-react'
import { Card } from '../_components/ui/card'
import { Progress } from '../_components/ui/progress'
import { TRANSACTION_CATEGORY_LABELS } from '../_constants/transactions'
import { db } from '../_lib/prisma'
import { formatCurrency } from '../_lib/utils'
import DashboardCard from './_components/DashboardCards'
import TransactionCard from './_components/TransactionCard'

const DashboardPage = async () => {
  // Obtendo as transações do banco de dados
  const transactions = await db.transaction.findMany()

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

  // Agrupando as transações por categoria e usando os rótulos de TRANSACTION_CATEGORY_LABELS
  const expensesByCategory = Object.keys(TRANSACTION_CATEGORY_LABELS).map(
    (category) => {
      const categoryTransactions = transactions.filter(
        (transaction) => transaction.category === category,
      )

      const totalAmount = categoryTransactions.reduce(
        (sum, transaction) => sum + transaction.amount.toNumber(),
        0,
      )

      const valuePercentage = totalExpenses
        ? (totalAmount / totalExpenses) * 100
        : 0

      return {
        label:
          TRANSACTION_CATEGORY_LABELS[
            category as keyof typeof TRANSACTION_CATEGORY_LABELS
          ],
        value: valuePercentage,
        amount: formatCurrency(totalAmount),
      }
    },
  )

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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Expenses by Category</h2>
            <div className="space-y-4">
              {expensesByCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{item.label}</span>
                    <span>{item.amount}</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Transactions</h2>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <TransactionCard
                  key={index}
                  name={transaction.name}
                  date={transaction.date}
                  amount={transaction.amount.toNumber()}
                  type={transaction.type}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
