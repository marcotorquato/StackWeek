import AddOrderButton from '../_components/add_orders_button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../_components/ui/breadcrumb'
import { db } from '../_lib/prisma'
import { ordersColumns, OrderWithRelations } from './_columns'
import { DataTable } from './_components/data-table'

export default async function OrdersPage() {
  // 1. Ajustar o findMany para incluir a tabela intermediária
  const orders = await db.order.findMany({
    include: {
      destination: true,
      // 'products' agora é um array de OrderProduct
      products: {
        include: {
          // Cada OrderProduct tem:
          //    orderId
          //    productId
          //    product: Product
          product: {
            include: {
              profile: true,
              catalog: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const ordersData: OrderWithRelations[] = orders.map((order) => ({
    id: order.id,
    requester: order.requester,
    email: order.email,
    requestDate: order.requestDate,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    destination: {
      id: order.destination.id,
      name: order.destination.name,
    },
    products: order.products.map((op) => ({
      // Campos de OrderProduct
      orderId: op.orderId,
      productId: op.productId,
      quantity: op.quantity,
      // Dados do Product relacionado
      product: {
        id: op.product.id,
        name: op.product.name,
        profile: {
          id: op.product.profile.id,
          name: op.product.profile.name,
        },
      },
    })),
  }))

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between p-4">
        <div className="flex w-full items-center justify-between p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold">IT SALES</h1>
          <AddOrderButton />
        </div>
      </div>
      <DataTable columns={ordersColumns} data={ordersData} />
    </div>
  )
}
