'use server';

import { db } from '@/database/db';
import { proveedor } from '@/database/schema/schema';
import { ProviderById, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateProvider {
  values: ProviderById;
}

export async function createProvider(
  prevState: ServerStatus,
  data: CreateProvider
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(proveedor)
      .values(data.values)
      .returning({ id: proveedor.id });

    return {
      success: true,
      title: 'Se creó el proveedor correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateProvider {
  id: number | string;
  values: ProviderById;
}

export async function updateProvider(
  prevState: ServerStatus,
  data: UpdateProvider
) {
  try {
    await db
      .update(proveedor)
      .set(data.values)
      .where(eq(proveedor.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
