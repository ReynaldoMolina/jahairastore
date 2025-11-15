'use server';

import { db } from '@/database/db';
import { recibos } from '@/database/schema/schema';
import { ReceiptFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateReceipt {
  values: ReceiptFormType;
}

export async function createReceipt(
  prevState: ServerStatus,
  data: CreateReceipt
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(recibos)
      .values(data.values)
      .returning({ id: recibos.id });

    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateReceipt {
  id: number | string;
  values: ReceiptFormType;
}

export async function updateReceipt(
  prevState: ServerStatus,
  data: UpdateReceipt
) {
  try {
    await db
      .update(recibos)
      .set(data.values)
      .where(eq(recibos.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
