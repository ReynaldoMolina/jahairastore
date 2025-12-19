'use server';

import { db } from '@/database/db';
import { compra } from '@/database/schema/schema';
import {
  stateCreateError,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { PurchaseFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreatePurchase {
  values: PurchaseFormType;
}

export async function createPurchase(
  prevState: ServerStatus,
  data: CreatePurchase
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(compra)
      .values(data.values)
      .returning({ id: compra.id });

    return {
      success: true,
      title: 'Se creó la compra correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdatePurchase {
  id: number | string;
  values: PurchaseFormType;
}

export async function updatePurchase(
  prevState: ServerStatus,
  data: UpdatePurchase
) {
  try {
    await db
      .update(compra)
      .set(data.values)
      .where(eq(compra.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
