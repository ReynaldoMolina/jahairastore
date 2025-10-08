'use server';

import { ProveedorFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { proveedor } from '@/database/schema';
import { eq } from 'drizzle-orm';

interface CreateProvider {
  values: ProveedorFormType;
}

export async function createProvider(prevState: unknown, data: CreateProvider) {
  try {
    await db.insert(proveedor).values(data.values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}

interface UpdateProvider {
  id: number | undefined;
  values: ProveedorFormType;
}

export async function updateProvider(prevState: unknown, data: UpdateProvider) {
  if (!data.id) return;

  try {
    await db
      .update(proveedor)
      .set(data.values)
      .where(eq(proveedor.id, Number(data.id)));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
