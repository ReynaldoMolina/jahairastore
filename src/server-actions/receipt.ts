'use server';

import { db } from '@/database/db';
import { recibo } from '@/database/schema/schema';
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
      .insert(recibo)
      .values(data.values)
      .returning({ id: recibo.id });

    return {
      success: true,
      title: 'Se creó el recibo correctamente.',
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
      .update(recibo)
      .set(data.values)
      .where(eq(recibo.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
