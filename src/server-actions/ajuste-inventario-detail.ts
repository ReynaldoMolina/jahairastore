'use server';

import { db } from '@/database/db';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import {
  AjusteInventarioDetailType,
  ServerStatus,
  TrasladoDetailType,
} from '@/types/types';
import { eq } from 'drizzle-orm';
import { productoAjusteDetalle } from '@/database/schema/schema';

interface CreateAjusteInvetarioDetailProps {
  values: AjusteInventarioDetailType[];
}

export async function createAjusteInvetarioDetail(
  prevState: ServerStatus,
  data: CreateAjusteInvetarioDetailProps
) {
  try {
    await db.insert(productoAjusteDetalle).values(data.values);

    return {
      success: true,
      title: 'Se agregó el producto correctamente.',
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateAjusteInventarioDetailProps {
  id: number | string;
  values: AjusteInventarioDetailType;
}

export async function updateAjusteInventarioDetail(
  prevState: ServerStatus,
  data: UpdateAjusteInventarioDetailProps
) {
  try {
    await db
      .update(productoAjusteDetalle)
      .set(data.values)
      .where(eq(productoAjusteDetalle.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

interface DeleteAjusteInventarioDetailProps {
  id: number | string;
}

export async function deleteAjusteInventarioDetail(
  prevState: ServerStatus,
  data: DeleteAjusteInventarioDetailProps
) {
  try {
    await db
      .delete(productoAjusteDetalle)
      .where(eq(productoAjusteDetalle.id, Number(data.id)));
    return {
      ...stateDeleteSuccess,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
