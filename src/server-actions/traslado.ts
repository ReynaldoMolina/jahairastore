'use server';

import { db } from '@/database/db';
import { productoTraslado } from '@/database/schema/schema';
import {
  stateCreateError,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { ServerStatus, TrasladoFormType } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateTrasladoProps {
  values: TrasladoFormType;
}

export async function createTraslado(
  prevState: ServerStatus,
  data: CreateTrasladoProps
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(productoTraslado)
      .values(data.values)
      .returning({ id: productoTraslado.id });

    return {
      success: true,
      title: 'Se creó el traslado correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateTraslado {
  id: number | string;
  values: TrasladoFormType;
}

export async function updateTraslado(
  prevState: ServerStatus,
  data: UpdateTraslado
) {
  try {
    await db
      .update(productoTraslado)
      .set(data.values)
      .where(eq(productoTraslado.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
