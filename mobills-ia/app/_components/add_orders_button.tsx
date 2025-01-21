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
import { FormEvent, useState } from 'react'

// Example minimal fields for creating an Order
type OrderFormData = {
  requester: string
  email: string
  destination: string
}

export default function AddOrderButton() {
  const [open, setOpen] = useState(false)

  // Local state to store form values
  const [formData, setFormData] = useState<OrderFormData>({
    requester: '',
    email: '',
    destination: '',
  })

  // Handle field changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Submit form
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order.')
      }

      alert('Order created successfully.')
      // Option A: Reload the page
      window.location.reload()

      // Option B: If using SWR/React Query, you could do a mutate() to refetch data
      // ...
    } catch (error) {
      console.error(error)
      alert('Error creating order. Please try again.')
    } finally {
      // Close the dialog
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* This is the button that triggers the dialog */}
      <DialogTrigger asChild>
        <Button className="bg-primary text-white py-2 px-4 rounded-md">
          Add Order
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>Please fill out the form below.</DialogDescription>
        </DialogHeader>

        {/* The form for creating an Order */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="requester" className="block text-sm font-medium">
              Requester
            </label>
            <input
              id="requester"
              name="requester"
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.requester}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium">
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          {/* 
            You can add other fields like status, requestDate, 
            or even a product list if you want to handle everything at once.
          */}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="default" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
