'use server';

import { CategoryFormType } from '@/types/types';
import { db } from '@/database';
import { categoria } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { stateError, stateSuccess } from './state-messages';
import { revalidatePath } from 'next/cache';

export async function createCategory(
  prevState: unknown,
  values: CategoryFormType
) {
  try {
    await db.insert(categoria).values(values);
    revalidatePath('categorias');

    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
}

interface UpdateCategory {
  id: number | string | undefined;
  values: CategoryFormType;
}

export async function updateCategory(prevState: unknown, data: UpdateCategory) {
  if (!data.id) return;

  try {
    await db
      .update(categoria)
      .set(data.values)
      .where(eq(categoria.id, Number(data.id)));
    revalidatePath('categorias');

    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
}
