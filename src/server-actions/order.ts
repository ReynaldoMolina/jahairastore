'use server';

import { db } from '@/database/db';
import { pedido } from '@/database/schema/schema';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { OrderFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateOrder {
  values: OrderFormType;
}

export async function createOrder(prevState: ServerStatus, data: CreateOrder) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(pedido)
      .values(data.values)
      .returning({ id: pedido.id });

    return {
      success: true,
      title: 'Se creó el pedido correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateOrder {
  id: number | string;
  values: OrderFormType;
}

export async function updateOrder(prevState: ServerStatus, data: UpdateOrder) {
  try {
    await db
      .update(pedido)
      .set(data.values)
      .where(eq(pedido.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
