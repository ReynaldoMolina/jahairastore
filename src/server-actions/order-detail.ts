'use server';

import { db } from '@/database/db';
import { pedidosDetalles } from '@/database/schema/schema';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { OrderDetailType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateOrderDetail {
  values: OrderDetailType;
}

export async function createOrderDetail(
  prevState: ServerStatus,
  data: CreateOrderDetail
) {
  try {
    await db.insert(pedidosDetalles).values(data.values);

    return {
      success: true,
      title: 'Se agregó el producto a la lista.',
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateOrderDetail {
  id: number | string;
  values: OrderDetailType;
}

export async function updateOrderDetail(
  prevState: ServerStatus,
  data: UpdateOrderDetail
) {
  try {
    await db
      .update(pedidosDetalles)
      .set(data.values)
      .where(eq(pedidosDetalles.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

interface DeleteOrderDetail {
  id: number | string;
}

export async function deleteOrderDetail(
  prevState: ServerStatus,
  data: DeleteOrderDetail
) {
  try {
    await db
      .delete(pedidosDetalles)
      .where(eq(pedidosDetalles.id, Number(data.id)));
    return {
      ...stateDeleteSuccess,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
