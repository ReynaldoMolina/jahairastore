'use server';

import { db } from '@/database/db';
import { clientes, proveedores } from '@/database/schema/schema';
import { ClientById, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateClient {
  values: ClientById;
}

export async function createClient(
  prevState: ServerStatus,
  data: CreateClient
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(clientes)
      .values(data.values)
      .returning({ id: proveedores.id });

    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateClient {
  id: number | string;
  values: ClientById;
}

export async function updateClient(
  prevState: ServerStatus,
  data: UpdateClient
) {
  try {
    await db
      .update(clientes)
      .set(data.values)
      .where(eq(clientes.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
