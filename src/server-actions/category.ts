'use server';

import { CategoryFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { categoria } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createCategory(
  prevState: unknown,
  values: CategoryFormType
) {
  try {
    await db.insert(categoria).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/categorias');
}

interface UpdateCategory {
  id: number | undefined;
  values: CategoryFormType;
}

export async function updateCategory(prevState: unknown, data: UpdateCategory) {
  if (!data.id) return;

  try {
    await db
      .update(categoria)
      .set(data.values)
      .where(eq(categoria.id, data.id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/categorias');
}
