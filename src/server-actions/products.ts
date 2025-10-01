'use server';

import { ProductsFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { productos } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createProduct(prevState, values: ProductsFormType) {
  try {
    await db.insert(productos).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/productos');
}

export async function updateProduct(
  id: number | undefined,
  prevState,
  values: ProductsFormType
) {
  if (!id) return;

  try {
    await db.update(productos).set(values).where(eq(productos.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/productos');
}
