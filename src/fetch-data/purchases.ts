import {
  compras,
  compras_detalles,
  egresos,
  proveedores,
} from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    proveedores.nombre_empresa,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: compras.id,
        nombre_empresa: proveedores.nombre_empresa,
        fecha: compras.fecha,
        total_compra: sql<number>`
          COALESCE(SUM(${compras_detalles.cantidad} *
          ${compras_detalles.precio_compra} *
          ${compras_detalles.cambio_dolar}), 0)
        `,
        total_gasto: sql<number>`
          COALESCE(SUM(${egresos.gasto} * ${egresos.cambio_dolar}), 0)
        `,
        ganancia: sql<number>`
          COALESCE(SUM(${compras_detalles.cantidad} *
          ${compras_detalles.precio_venta} *
          ${compras_detalles.cambio_dolar}), 0) -
          COALESCE(SUM(${compras_detalles.cantidad} *
          ${compras_detalles.precio_compra} *
          ${compras_detalles.cambio_dolar}), 0) -
          COALESCE(SUM(${egresos.gasto} * ${egresos.cambio_dolar}), 0)
        `,
      })
      .from(compras)
      .leftJoin(proveedores, eq(compras.id_proveedor, proveedores.id))
      .leftJoin(compras_detalles, eq(compras.id, compras_detalles.id_compra))
      .leftJoin(egresos, eq(compras.id, egresos.id_compra))
      .where(filterBySearch)
      .groupBy(compras.id, proveedores.nombre_empresa, compras.fecha)
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(compras, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las compras, por favor intenta de nuevo.'
    );
  }
}

export async function getPurchaseById(id: number) {
  try {
    const [data] = await db.select().from(compras).where(eq(compras.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}
