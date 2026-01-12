'use server';

import { db } from '@/database/db';
import { productoTrasladoDetalle } from '@/database/schema/schema';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { ServerStatus, TrasladoDetailType } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateTrasladoDetailProps {
  values: TrasladoDetailType[];
}

export async function createTrasladoDetail(
  prevState: ServerStatus,
  data: CreateTrasladoDetailProps
) {
  try {
    await db.insert(productoTrasladoDetalle).values(data.values);

    return {
      success: true,
      title: 'Se agregó el producto correctamente.',
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateTrasladoDetailProps {
  id: number | string;
  values: TrasladoDetailType;
}

export async function updateTrasladoDetail(
  prevState: ServerStatus,
  data: UpdateTrasladoDetailProps
) {
  try {
    await db
      .update(productoTrasladoDetalle)
      .set(data.values)
      .where(eq(productoTrasladoDetalle.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

interface DeleteTrasladoDetailProps {
  id: number | string;
}

export async function deleteTrasladoDetail(
  prevState: ServerStatus,
  data: DeleteTrasladoDetailProps
) {
  try {
    await db
      .delete(productoTrasladoDetalle)
      .where(eq(productoTrasladoDetalle.id, Number(data.id)));
    return {
      ...stateDeleteSuccess,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
