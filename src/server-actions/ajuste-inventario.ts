'use server';

import { db } from '@/database/db';
import {
  stateCreateError,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { AjusteInventarioFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import { productoAjuste } from '@/database/schema/schema';

interface CreateAjusteInventarioProps {
  values: AjusteInventarioFormType;
}

export async function createAjusteInventario(
  prevState: ServerStatus,
  data: CreateAjusteInventarioProps
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(productoAjuste)
      .values(data.values)
      .returning({ id: productoAjuste.id });

    return {
      success: true,
      title: 'Se creó el ajuste correctamente.',
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateAjusteInventario {
  id: number | string;
  values: AjusteInventarioFormType;
}

export async function updateAjusteInventario(
  prevState: ServerStatus,
  data: UpdateAjusteInventario
) {
  try {
    await db
      .update(productoAjuste)
      .set(data.values)
      .where(eq(productoAjuste.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
