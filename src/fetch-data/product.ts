import { db } from '@/database/db';
import {
  comprasDetalles,
  productos,
  ventasDetalles,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getProducts(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [productos.nombre]);

  const filterByState = state
    ? sql`(
      COALESCE("Compras"."cantidad", 0) - COALESCE("Ventas"."cantidad", 0) > 0)`
    : undefined;

  try {
    const compras = db
      .select({
        idProducto: comprasDetalles.idProducto,
        cantidad: sql<number>`SUM(${comprasDetalles.cantidad})`.as('cantidad'),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idProducto)
      .as('Compras');

    const ventas = db
      .select({
        idProducto: ventasDetalles.idProducto,
        cantidad: sql<number>`SUM(${ventasDetalles.cantidad})`.as('cantidad'),
      })
      .from(ventasDetalles)
      .groupBy(ventasDetalles.idProducto)
      .as('Ventas');

    const data = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        idShein: productos.idShein,
        precioEnCordobas: productos.precioEnCordobas,
        cambioDolar: productos.cambioDolar,
        precioCompra: productos.precioCompra,
        precioVenta: productos.precioVenta,
        gananciaUnidad: sql<number>`${productos.precioVenta} - ${productos.precioCompra}`,
        existencias: sql<number>`
          (COALESCE("Compras"."cantidad", 0)
          - COALESCE("Ventas"."cantidad", 0))::integer
        `,
        gananciaExistencias: sql<number>`
          (
            (COALESCE("Compras"."cantidad", 0) - COALESCE("Ventas"."cantidad", 0))
            * (${productos.precioVenta} - ${productos.precioCompra})
          )`,
      })
      .from(productos)
      .leftJoin(compras, eq(productos.id, compras.idProducto))
      .leftJoin(ventas, eq(productos.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(productos.id));

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productos)
      .leftJoin(compras, eq(productos.id, compras.idProducto))
      .leftJoin(ventas, eq(productos.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProductById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(productos)
      .where(eq(productos.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el producto.');
  }
}

export async function getProductsSearchList(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [productos.nombre]);

  const filterByState = state
    ? sql`(
      COALESCE("ComprasTotales"."cantidad", 0) - COALESCE("VentasTotales"."cantidad", 0) > 0)`
    : undefined;

  try {
    const compras = db
      .select({
        idProducto: comprasDetalles.idProducto,
        cantidad: sql<number>`SUM(${comprasDetalles.cantidad})`.as('cantidad'),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idProducto)
      .as('ComprasTotales');

    const ventas = db
      .select({
        idProducto: ventasDetalles.idProducto,
        cantidad: sql<number>`SUM(${ventasDetalles.cantidad})`.as('cantidad'),
      })
      .from(ventasDetalles)
      .groupBy(ventasDetalles.idProducto)
      .as('VentasTotales');

    const products = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        idShein: productos.idShein,
        precioCompra: productos.precioCompra,
        precioVenta: productos.precioVenta,
        cambioDolar: productos.cambioDolar,
        existencias: sql<number>`
          (COALESCE("ComprasTotales"."cantidad", 0) - COALESCE("VentasTotales"."cantidad", 0))::integer
        `,
        precioEnCordobas: productos.precioEnCordobas,
      })
      .from(productos)
      .leftJoin(compras, eq(compras.idProducto, productos.id))
      .leftJoin(ventas, eq(ventas.idProducto, productos.id))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(productos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(productos)
      .leftJoin(compras, eq(compras.idProducto, productos.id))
      .leftJoin(ventas, eq(ventas.idProducto, productos.id))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { products, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos.');
  }
}
