'use server';

import { db } from '@/database/db';
import { cliente, proveedor } from '@/database/schema/schema';
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
      .insert(cliente)
      .values(data.values)
      .returning({ id: proveedor.id });

    return {
      success: true,
      title: 'Se creó el cliente correctamente.',
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
      .update(cliente)
      .set(data.values)
      .where(eq(cliente.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
