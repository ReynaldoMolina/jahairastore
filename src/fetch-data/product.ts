import { db } from '@/database/db';
import {
  compraDetalle,
  producto,
  ventaDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getProducts(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [producto.nombre]);

  const filterByState = state
    ? sql`(
      COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0) > 0)`
    : undefined;

  try {
    const compras = db
      .select({
        idProducto: compraDetalle.idProducto,
        cantidad: sql<number>`SUM(${compraDetalle.cantidad})`.as('cantidad'),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idProducto)
      .as('compras');

    const ventas = db
      .select({
        idProducto: ventaDetalle.idProducto,
        cantidad: sql<number>`SUM(${ventaDetalle.cantidad})`.as('cantidad'),
      })
      .from(ventaDetalle)
      .groupBy(ventaDetalle.idProducto)
      .as('ventas');

    const data = await db
      .select({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        precioEnCordobas: producto.precioEnCordobas,
        cambioDolar: producto.cambioDolar,
        precioCompra: producto.precioCompra,
        precioVenta: producto.precioVenta,
        gananciaUnidad: sql<number>`${producto.precioVenta} - ${producto.precioCompra}`,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0))::integer
        `,
        gananciaExistencias: sql<number>`
          (
            (COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0))
            * (${producto.precioVenta} - ${producto.precioCompra})
          )`,
      })
      .from(producto)
      .leftJoin(compras, eq(producto.id, compras.idProducto))
      .leftJoin(ventas, eq(producto.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(producto.id));

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(producto)
      .leftJoin(compras, eq(producto.id, compras.idProducto))
      .leftJoin(ventas, eq(producto.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los producto');
  }
}

export async function getProductById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(producto)
      .where(eq(producto.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el producto.');
  }
}

export async function getProductsSearchList(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [producto.nombre]);

  const filterByState = state
    ? sql`(
      COALESCE("compras_totales"."cantidad", 0) - COALESCE("ventas_totales"."cantidad", 0) > 0)`
    : undefined;

  try {
    const compras = db
      .select({
        idProducto: compraDetalle.idProducto,
        cantidad: sql<number>`SUM(${compraDetalle.cantidad})`.as('cantidad'),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idProducto)
      .as('compras_totales');

    const ventas = db
      .select({
        idProducto: ventaDetalle.idProducto,
        cantidad: sql<number>`SUM(${ventaDetalle.cantidad})`.as('cantidad'),
      })
      .from(ventaDetalle)
      .groupBy(ventaDetalle.idProducto)
      .as('ventas_totales');

    const products = await db
      .select({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        precioCompra: producto.precioCompra,
        precioVenta: producto.precioVenta,
        precioVentaPorMayor: producto.precioVentaPorMayor,
        cambioDolar: producto.cambioDolar,
        existencias: sql<number>`
          (COALESCE("compras_totales"."cantidad", 0) - COALESCE("ventas_totales"."cantidad", 0))::integer
        `,
        precioEnCordobas: producto.precioEnCordobas,
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
    throw new Error('No se pudieron obtener los producto.');
  }
}
