'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'

type DeleteOrderButtonProps = {
  orderId: number
  orderNumber?: string | number
}

export default function DeleteOrderButton({
  orderId,
  orderNumber,
}: DeleteOrderButtonProps) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Error deleting the order.')
      }
      alert('Order successfully deleted.')

      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Failed to delete the order. Please try again.')
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          title="Delete"
          size="icon"
          className="text-red-400"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete order #{orderNumber ?? orderId}?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
