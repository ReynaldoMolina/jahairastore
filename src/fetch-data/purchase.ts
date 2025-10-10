import { compra, compra_detalle, gasto, proveedor } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    proveedor.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: compra.id,
        proveedor_nombre: proveedor.nombre,
        fecha: compra.fecha,
        total_compra: sql<number>`
          CASE WHEN ${compra_detalle.precio_en_cordobas} = true
            THEN
              COALESCE(SUM(${compra_detalle.cantidad} * ${compra_detalle.precio} * ${compra_detalle.cambio_dolar}), 0)
            ELSE
              COALESCE(SUM(${compra_detalle.cantidad} * ${compra_detalle.precio}), 0)
          END
        `,
        total_gasto: sql<number>`
          COALESCE(SUM(${gasto.monto} * ${gasto.cambio_dolar}), 0)
        `,
        total: sql<number>`
        (
          CASE 
            WHEN ${compra_detalle.precio_en_cordobas} = true THEN
              COALESCE(SUM(${compra_detalle.cantidad} * ${compra_detalle.precio} * ${compra_detalle.cambio_dolar}), 0)
            ELSE
              COALESCE(SUM(${compra_detalle.cantidad} * ${compra_detalle.precio}), 0)
          END
        )
        +
        COALESCE(SUM(${gasto.monto} * ${gasto.cambio_dolar}), 0)
      `,
      })
      .from(compra)
      .leftJoin(proveedor, eq(compra.id_proveedor, proveedor.id))
      .leftJoin(compra_detalle, eq(compra.id, compra_detalle.id_compra))
      .leftJoin(gasto, eq(compra.id, gasto.id_compra))
      .where(filterBySearch)
      .groupBy(
        compra.id,
        proveedor.nombre,
        compra.fecha,
        compra_detalle.precio_en_cordobas
      )
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(compra, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las compra, por favor intenta de nuevo.'
    );
  }
}

export async function getPurchaseById(id: number) {
  try {
    const [data] = await db.select().from(compra).where(eq(compra.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}
