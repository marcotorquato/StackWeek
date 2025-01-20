// app/api/orders/[orderId]/route.ts
import { db } from '@/app/_lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } },
) {
  try {
    const id = Number(params.orderId)

    await db.order.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: 'Error deleting the order' },
      { status: 500 },
    )
  }
}
