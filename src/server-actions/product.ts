'use server';

import { ProductoFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { producto } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createProduct(
  prevState: unknown,
  values: ProductoFormType
) {
  try {
    await db.insert(producto).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/productos');
}

export async function updateProduct(
  id: number | undefined,
  prevState: unknown,
  values: ProductoFormType
) {
  if (!id) return;

  try {
    await db.update(producto).set(values).where(eq(producto.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/productos');
}
