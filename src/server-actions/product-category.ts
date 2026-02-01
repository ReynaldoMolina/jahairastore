'use server';

import { db } from '@/database/db';
import { productoCategoria, proveedor } from '@/database/schema/schema';
import { CategoryById, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
} from './stateMessage';

interface CreateCategory {
  values: CategoryById;
}

export async function createCategory(
  prevState: ServerStatus,
  data: CreateCategory
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(productoCategoria)
      .values(data.values)
      .returning({ id: proveedor.id });

    return {
      success: true,
      title: 'Se creó el categoría correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateCategory {
  id: number | string;
  values: CategoryById;
}

export async function updateCategory(
  prevState: ServerStatus,
  data: UpdateCategory
) {
  try {
    await db
      .update(productoCategoria)
      .set(data.values)
      .where(eq(productoCategoria.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
