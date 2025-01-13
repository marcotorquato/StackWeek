'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import UpsertTransactionDialog from './upsert-transaction-dialog'

const AddOrderButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        <PlusIcon /> Order
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  )
}

export default AddOrderButton
