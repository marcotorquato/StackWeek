import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../_components/ui/breadcrumb'
import { Button } from '../_components/ui/button'
import { db } from '../_lib/prisma'
import { ordersColumns, OrderWithRelations } from './_columns'
import { DataTable } from './_components/data-table'

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include: {
      destination: true,
      products: {
        include: {
          profile: true,
          catalog: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const ordersData: OrderWithRelations[] = orders.map((order) => ({
    ...order,
    destination: order.destination,
    products: order.products.map((product) => ({
      ...product,
      profile: product.profile,
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
          <Button className="bg-primary text-white py-2 px-4 rounded-md">
            Add Order
          </Button>
        </div>
      </div>
      <DataTable columns={ordersColumns} data={ordersData} />
    </div>
  )
}
