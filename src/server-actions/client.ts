'use server';

import { ClienteFormType } from '@/types/types';
import { db } from '@/database';
import { cliente } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { stateError, stateSuccess } from './state-messages';

interface CreateClient {
  values: ClienteFormType;
}

export async function createClient(prevState: unknown, data: CreateClient) {
  try {
    await db.insert(cliente).values(data.values);
    revalidatePath('/clientes');
    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
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

    revalidatePath('/clientes');
    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
}
