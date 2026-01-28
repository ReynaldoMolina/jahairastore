'use server';

import { db } from '@/database/db';
import { compraDetalle, producto } from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { PurchaseDetailType, ServerStatus } from '@/types/types';
import {
  stateCreateError,
  stateDeleteError,
  stateUpdateError,
  stateUpdateSuccess,
} from './stateMessage';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

/**
 * Recalculates and updates the average cost of a product based on all its purchase details.
 * Formula: Sum(Cost * Qty) / Sum(Qty)
 */

type DbLike =
  | NodePgDatabase
  | Parameters<Parameters<typeof db.transaction>[0]>[0];

async function updateProductAvgCost(idProducto: number, tx: DbLike = db) {
  const [result] = await tx
    .select({
      totalCosto: sql<number>`sum(${compraDetalle.costo} * ${compraDetalle.cantidad})::float`,
      totalCantidad: sql<number>`sum(${compraDetalle.cantidad})::float`,
    })
    .from(compraDetalle)
    .where(eq(compraDetalle.idProducto, idProducto));

  const totalCosto = result?.totalCosto ?? 0;
  const totalCantidad = result?.totalCantidad ?? 0;

  const avgCost = totalCantidad > 0 ? totalCosto / totalCantidad : 0;

  await tx
    .update(producto)
    .set({ costo: avgCost })
    .where(eq(producto.id, idProducto));
}

interface CreatePurchaseDetail {
  values: PurchaseDetailType[];
}

export async function createPurchaseDetail(
  prevState: ServerStatus,
  data: CreatePurchaseDetail
) {
  const isPlural = data.values.length > 1;

  try {
    await db.transaction(async (tx) => {
      // Insert all details
      await tx.insert(compraDetalle).values(data.values);

      // Get unique product IDs
      const uniqueProductIds = [
        ...new Set(data.values.map((v) => v.idProducto)),
      ];

      // Update cost once per product
      for (const productId of uniqueProductIds) {
        await updateProductAvgCost(productId, tx);
      }
    });

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
    if (!data.id) return stateUpdateError;

    await db.transaction(async (tx) => {
      await tx
        .update(compraDetalle)
        .set(data.values)
        .where(eq(compraDetalle.id, Number(data.id)));

      await updateProductAvgCost(data.values.idProducto, tx);
    });

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
  if (!data.id) return stateUpdateError;

  try {
    await db.transaction(async (tx) => {
      const [detail] = await tx
        .select({ idProducto: compraDetalle.idProducto })
        .from(compraDetalle)
        .where(eq(compraDetalle.id, Number(data.id)));

      if (!detail) throw new Error('Not found');

      await tx
        .delete(compraDetalle)
        .where(eq(compraDetalle.id, Number(data.id)));

      await updateProductAvgCost(detail.idProducto, tx);
    });

    return {
      success: true,
      title: `Se eliminó el producto ${data.id}.`,
    };
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
