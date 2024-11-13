"use server"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client"
import { addTransactionSchema } from "./schema"

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}
export const addTransaction = async (params: UpsertTransactionParams) =>{
  addTransactionSchema.parse(params);
  const { userId} = await auth();
  if (!userId) {
    throw new Error("Unauthorized")
  }
  await db.transaction.create ({
    data: {...params, userId}

  })
}