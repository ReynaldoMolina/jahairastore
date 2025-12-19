'use server';

import { db } from '@/database/db';
import { venta } from '@/database/schema/schema';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { SaleFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateSale {
  values: SaleFormType;
}

export async function createSale(prevState: ServerStatus, data: CreateSale) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(venta)
      .values(data.values)
      .returning({ id: venta.id });

    return {
      success: true,
      title: 'Se creó la venta correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateSale {
  id: number | string;
  values: SaleFormType;
}

export async function updateSale(prevState: ServerStatus, data: UpdateSale) {
  try {
    await db
      .update(venta)
      .set(data.values)
      .where(eq(venta.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
