'use server';

import { db } from '@/database/db';
import { productos } from '@/database/schema/schema';
import { ProductFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateProduct {
  values: ProductFormType;
}

export async function createProduct(
  prevState: ServerStatus,
  data: CreateProduct
) {
  try {
    await db.insert(productos).values(data.values);
    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateProduct {
  id: number | string;
  values: ProductFormType;
}

export async function updateProduct(
  prevState: ServerStatus,
  data: UpdateProduct
) {
  try {
    await db
      .update(productos)
      .set(data.values)
      .where(eq(productos.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
