'use server';

import { db } from '@/database/db';
import { proveedores } from '@/database/schema/schema';
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
      .insert(proveedores)
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
      .update(proveedores)
      .set(data.values)
      .where(eq(proveedores.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
