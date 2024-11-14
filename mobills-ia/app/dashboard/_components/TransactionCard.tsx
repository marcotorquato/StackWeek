import { formatCurrency } from '@/app/_lib/utils'
import {
  BitcoinIcon,
  BuildingIcon,
  DollarSignIcon,
  GraduationCapIcon,
  HomeIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

interface TransactionCardProps {
  name: string
  date: Date | string
  amount: number
  type: 'DEPOSIT' | 'EXPENSE' | 'INVESTMENT'
}

export default function TransactionCard({
  name,
  date,
  amount,
  type,
}: TransactionCardProps) {
  // Definir o ícone com base no nome da transação
  const icon: ReactNode =
    name === 'Salary' ? (
      <DollarSignIcon className="w-4 h-4" />
    ) : name === 'Bitcoin' ? (
      <BitcoinIcon className="w-4 h-4" />
    ) : name === 'Gym' ? (
      <GraduationCapIcon className="w-4 h-4" />
    ) : name === 'Rent' ? (
      <HomeIcon className="w-4 h-4" />
    ) : (
      <BuildingIcon className="w-4 h-4" />
    )

  // Formatar a data se for do tipo `Date`
  const displayDate =
    typeof date === 'string' ? date : date.toLocaleDateString()

  // Definir a cor com base no tipo da transação
  const amountColor =
    type === 'DEPOSIT'
      ? 'text-green-500'
      : type === 'EXPENSE'
        ? 'text-red-500'
        : 'text-white' // Cor branca para 'INVESTMENT'

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{displayDate}</div>
        </div>
      </div>
      <div className={amountColor}>{formatCurrency(amount)}</div>
    </div>
  )
}
