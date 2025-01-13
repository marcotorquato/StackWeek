import { Badge } from '@/app/_components/ui/badge'
import { Transaction, TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-green-500 hover:bg-muted font-bold">
        <CircleIcon className="fill-green-500 mr-2" size={10} />
        Income
      </Badge>
    )
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-muted text-red-500 hover:bg-muted font-boldr">
        <CircleIcon className="fill-red-500 mr-2" size={10} />
        Expense
      </Badge>
    )
  }
  return (
    <Badge className="bg-muted text-indigo-500 hover:bg-muted font-bold">
      <CircleIcon className="fill-indigo-500 mr-2" size={10} />
      Investment
    </Badge>
  )
}

export default TransactionTypeBadge
