'use server';

import { ClienteFormType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { cliente } from '@/database/schema';
import { eq } from 'drizzle-orm';

interface CreateClient {
  values: ClienteFormType;
}

export async function createClient(prevState: unknown, data: CreateClient) {
  try {
    await db.insert(cliente).values(data.values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/clientes');
}

interface UpdateClient {
  id: number | string | undefined;
  values: ClienteFormType;
}

export async function updateClient(prevState: unknown, data: UpdateClient) {
  if (!data.id) return;

  try {
    await db
      .update(cliente)
      .set(data.values)
      .where(eq(cliente.id, Number(data.id)));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/clientes');
}
