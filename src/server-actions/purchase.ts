'use server';

import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { compras } from '@/database/schema';
import { PurchaseFormType } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function createPurchase(
  prevState: unknown,
  values: PurchaseFormType
) {
  let returningData: { id: number };
  try {
    [returningData] = await db
      .insert(compras)
      .values(values)
      .returning({ id: compras.id });
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/compras/${returningData.id}`);
}

export async function updatePurchase(
  id: number | undefined,
  prevState: unknown,
  values: PurchaseFormType
) {
  if (!id) return;

  try {
    await db.update(compras).set(values).where(eq(compras.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/compras');
}
