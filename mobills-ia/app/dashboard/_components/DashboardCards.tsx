// components/DashboardCard.tsx

import { ReactNode } from 'react'
import { Card } from '../../_components/ui/card'

interface DashboardCardProps {
  icon: ReactNode
  title: string
  amount: string
  valueColor?: string
}

export default function DashboardCard({
  icon,
  title,
  amount,
  valueColor = 'text-foreground',
}: DashboardCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          {icon}
          {title}
        </div>
        <div className={`text-2xl font-bold ${valueColor}`}>{amount}</div>
      </div>
    </Card>
  )
}
