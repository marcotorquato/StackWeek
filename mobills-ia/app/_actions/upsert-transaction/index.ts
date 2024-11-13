'use server'

import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { upsertTransactionSchema } from './schema'

interface TransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

// Função para criar uma nova transação
export const createTransaction = async (
  params: Omit<TransactionParams, 'id'>,
) => {
  // Valida os parâmetros usando o schema
  upsertTransactionSchema.parse(params)

  // Obtém o userId do usuário autenticado
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  // Cria a transação no banco de dados
  await db.transaction.create({
    data: {
      ...params,
      userId,
    },
  })

  // Revalida a rota para atualizar os dados na página
  revalidatePath('/transactions')
}

// Função para atualizar ou criar (upsert) uma transação
export const upsertTransaction = async (params: TransactionParams) => {
  // Valida os parâmetros usando o schema
  upsertTransactionSchema.parse(params)

  // Obtém o userId do usuário autenticado
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  // Verifica se o ID foi fornecido para decidir entre criar ou atualizar
  if (params.id) {
    // Realiza o upsert (atualização ou criação)
    await db.transaction.upsert({
      where: {
        id: params.id,
      },
      update: { ...params, userId },
      create: { ...params, userId },
    })
  } else {
    // Chama a função createTransaction se o ID não for fornecido
    await createTransaction(params)
  }

  // Revalida a rota para atualizar os dados na página
  revalidatePath('/transactions')
}
