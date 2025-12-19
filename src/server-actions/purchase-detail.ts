'use server';

import { db } from '@/database/db';
import { compraDetalle } from '@/database/schema/schema';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { PurchaseDetailType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';

interface CreatePurchaseDetail {
  values: PurchaseDetailType[];
}

export async function createPurchaseDetail(
  prevState: ServerStatus,
  data: CreatePurchaseDetail
) {
  const isPlural = data.values.length > 1;

  try {
    await db.insert(compraDetalle).values(data.values);

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

interface UpdatePurchaseDetail {
  id: number | string;
  values: PurchaseDetailType;
}

export async function updatePurchaseDetail(
  prevState: ServerStatus,
  data: UpdatePurchaseDetail
) {
  try {
    await db
      .update(compraDetalle)
      .set(data.values)
      .where(eq(compraDetalle.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

interface DeletePurchaseDetail {
  id: number | string;
}

export async function deletePurchaseDetail(
  prevState: ServerStatus,
  data: DeletePurchaseDetail
) {
  try {
    await db.delete(compraDetalle).where(eq(compraDetalle.id, Number(data.id)));
    return {
      ...stateDeleteSuccess,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
