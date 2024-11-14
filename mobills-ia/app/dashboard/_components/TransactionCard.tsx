// components/TransactionCard.tsx

import { formatCurrency } from '@/app/_lib/utils'
import { ReactNode } from 'react'

interface TransactionCardProps {
  icon: ReactNode
  name: string
  date: Date | string
  amount: number
  positive: boolean
}

export default function TransactionCard({
  icon,
  name,
  date,
  amount,
  positive,
}: TransactionCardProps) {
  // Formatar a data se for do tipo `Date`
  const displayDate =
    typeof date === 'string' ? date : date.toLocaleDateString()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{displayDate}</div>
        </div>
      </div>
      <div className={positive ? 'text-green-500' : 'text-red-500'}>
        {formatCurrency(amount)}
      </div>
    </div>
  )
}
