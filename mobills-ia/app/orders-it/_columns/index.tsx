'use client'

import { Button } from '@/app/_components/ui/button'
import { OrderStatus } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil } from 'lucide-react'
import DeleteOrderButton from '../_components/delete_orders_button'

export type OrderWithRelations = {
  id: number
  requester: string
  email: string
  requestDate: Date
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  destination: {
    id: number
    name: string
  }
  products: {
    orderId: number
    productId: number
    quantity: number
    product: {
      id: number
      name: string
      profile: {
        id: number
        name: string
      }
    }
  }[]
}

export const ordersColumns: ColumnDef<OrderWithRelations>[] = [
  {
    accessorKey: 'requester',
    header: 'Requester',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'destination.name',
    header: 'Destination',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const order = row.original
      switch (order.status) {
        case 'REQUESTED':
          return <span className="text-blue-500">Requested</span>
        case 'UNDER_APPROVAL':
          return <span className="text-yellow-500">Under Approval</span>
        case 'IN_PREPARATION':
          return <span className="text-orange-500">In Preparation</span>
        case 'DELIVERED':
          return <span className="text-green-500">Delivered</span>
        default:
          return <span className="text-gray-400">Unknown</span>
      }
    },
  },
  {
    accessorKey: 'products',
    header: 'Products',
    cell: ({ row }) => {
      const orderProducts = row.original.products
      if (!orderProducts.length) return 'No products'
      return (
        <ul className="list-disc list-inside">
          {orderProducts.map((op) => (
            <li key={op.productId}>
              {op.product.name} (x{op.quantity}) -{' '}
              <span className="italic">{op.product.profile.name}</span>
            </li>
          ))}
        </ul>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const order = row.original

      const handleView = () => {
        console.log('View order details:', order.id)
      }

      const handleEdit = () => {
        console.log('Edit order:', order.id)
      }

      return (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            onClick={handleView}
            title="View"
            size="icon"
            className="text-muted-foreground"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={handleEdit}
            title="Edit"
            size="icon"
            className="text-muted-foreground"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <DeleteOrderButton orderId={order.id} orderNumber={order.id} />
        </div>
      )
    },
  },
]
