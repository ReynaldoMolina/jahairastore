'use server';

import { db } from '@/database/db';
import { pedidos, ventas } from '@/database/schema/schema';
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
      .insert(pedidos)
      .values(data.values)
      .returning({ id: pedidos.id });

    return {
      ...stateCreateSuccess,
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
      .update(pedidos)
      .set(data.values)
      .where(eq(pedidos.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
