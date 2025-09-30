'use server';

import { ClientFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { clientes } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createClient(prevState, values: ClientFormType) {
  try {
    await db.insert(clientes).values(values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/clientes');
}

export async function updateClient(
  id: number | undefined,
  prevState,
  values: ClientFormType
) {
  if (!id) return;

  try {
    await db.update(clientes).set(values).where(eq(clientes.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/clientes');
}
