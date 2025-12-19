'use server';

import { db } from '@/database/db';
import { ventaDetalle } from '@/database/schema/schema';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { SaleDetailType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreateSaleDetail {
  values: SaleDetailType[];
}

export async function createSaleDetail(
  prevState: ServerStatus,
  data: CreateSaleDetail
) {
  const isPlural = data.values.length > 1;

  try {
    await db.insert(ventaDetalle).values(data.values);

    return {
      success: true,
      title: `Se ${isPlural ? 'agregaron' : 'agregó'} ${data.values.length} ${
        isPlural ? 'productos' : 'producto'
      } correctamente.`,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateSaleDetail {
  id: number | string;
  values: SaleDetailType;
}

export async function updateSaleDetail(
  prevState: ServerStatus,
  data: UpdateSaleDetail
) {
  try {
    await db
      .update(ventaDetalle)
      .set(data.values)
      .where(eq(ventaDetalle.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

interface DeleteSaleDetail {
  id: number | string;
}

export async function deleteSaleDetail(
  prevState: ServerStatus,
  data: DeleteSaleDetail
) {
  try {
    await db.delete(ventaDetalle).where(eq(ventaDetalle.id, Number(data.id)));
    return {
      ...stateDeleteSuccess,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
