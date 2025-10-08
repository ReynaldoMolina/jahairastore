'use server';

import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { compras_detalles } from '@/database/schema';
import { PurchaseDetailType } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function createPurchaseDetail(
  prevState: unknown,
  values: PurchaseDetailType[]
) {
  try {
    await db.insert(compras_detalles).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function updatePurchaseDetail(
  id: number | undefined,
  prevState: unknown,
  values: PurchaseDetailType
) {
  if (!id) return;

  try {
    await db
      .update(compras_detalles)
      .set(values)
      .where(eq(compras_detalles.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/compras');
}
