'use server';

import { db } from '@/database/db';
import { compras } from '@/database/schema/schema';
import {
  stateCreateError,
  stateCreateSuccess,
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
      .insert(compras)
      .values(data.values)
      .returning({ id: compras.id });

    return {
      ...stateCreateSuccess,
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
      .update(compras)
      .set(data.values)
      .where(eq(compras.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
