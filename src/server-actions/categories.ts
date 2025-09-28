'use server';

import { CategoryFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { categorias } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createCategory(prevState, values: CategoryFormType) {
  try {
    await db.insert(categorias).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/categorias');
}

export async function updateCategory(
  id: number | undefined,
  prevState,
  values: CategoryFormType
) {
  if (!id) return;

  try {
    await db.update(categorias).set(values).where(eq(categorias.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/categorias');
}
