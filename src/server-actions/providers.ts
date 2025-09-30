'use server';

import { ProviderFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { proveedores } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createProvider(prevState, values: ProviderFormType) {
  try {
    await db.insert(proveedores).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(
  id: number | undefined,
  prevState,
  values: ProviderFormType
) {
  if (!id) return;

  try {
    await db.update(proveedores).set(values).where(eq(proveedores.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
