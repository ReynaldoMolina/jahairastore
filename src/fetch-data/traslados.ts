import { db } from '@/database/db';
import {
  compra,
  compraDetalle,
  producto,
  productoTraslado,
  productoTrasladoDetalle,
  venta,
  ventaDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, asc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { getStock } from './stock';

export async function getTraslados(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [producto.nombre]);

  try {
    const data = await db
      .select()
      .from(productoTraslado)
      .where(and(filterBySearch))
      .orderBy(asc(productoTraslado.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productoTraslado)
      .where(and(filterBySearch));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los traslados');
  }
}

export async function getTrasladoById(id: number | string) {
  try {
    const [traslado] = await db
      .select()
      .from(productoTraslado)
      .where(eq(productoTraslado.id, Number(id)));

    const detail = await db
      .select({
        id: productoTrasladoDetalle.id,
        idTraslado: productoTrasladoDetalle.idTraslado,
        idProducto: productoTrasladoDetalle.idProducto,
        nombre: producto.nombre,
        cantidad: productoTrasladoDetalle.cantidad,
      })
      .from(productoTrasladoDetalle)
      .leftJoin(producto, eq(productoTrasladoDetalle.idProducto, producto.id))
      .where(eq(productoTrasladoDetalle.idTraslado, Number(id)))
      .orderBy(desc(productoTrasladoDetalle.id));

    return {
      ...traslado,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener el traslado.');
  }
}

export async function getProductsSearchList(
  searchParams: SearchParamsProps,
  idUbicacion: number
) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [producto.nombre]);

  const filterByState = state
    ? sql`(
      COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0) > 0)`
    : undefined;

  try {
    const { compras, ventas } = await getStock(idUbicacion);

    const products = await db
      .select({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0))::integer
        `,
      })
      .from(producto)
      .leftJoin(compras, eq(compras.idProducto, producto.id))
      .leftJoin(ventas, eq(ventas.idProducto, producto.id))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(producto.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(producto)
      .leftJoin(compras, eq(compras.idProducto, producto.id))
      .leftJoin(ventas, eq(ventas.idProducto, producto.id))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { products, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos.');
  }
}
