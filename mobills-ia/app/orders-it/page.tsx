import { auth } from '@clerk/nextjs/server'
import { BreadcrumbItem } from '@nextui-org/breadcrumbs'
import { redirect } from 'next/navigation'
import AddOrderButton from '../_components/add_orders_button'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../_components/ui/breadcrumb'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'
import { transactionColumns } from './_columns'

const TransactionPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>IT Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">IT Orders</h1>
        <AddOrderButton />
      </div>
      <div className="px-6">
        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </div>
  )
}

export default TransactionPage
