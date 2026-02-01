import { db } from '@/database/db';
import { producto } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { asc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { getStock } from './stock';

export async function getProducts(searchParams: SearchParamsProps) {
  const { query, state, limit, offset, ubicacion } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    producto.nombre,
    producto.codigo,
  ]);

  const filterByState = state
    ? sql`
    (
      COALESCE("compras"."cantidad", 0)
    - COALESCE("ventas"."cantidad", 0)
    + COALESCE("traslados_entrada"."cantidad", 0)
    - COALESCE("traslados_salida"."cantidad", 0)
    + COALESCE("ajustes"."cantidad", 0)
    )::float > 0
  `
    : undefined;

  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida, ajustes } =
      await getStock(ubicacion);

    const data = await db
      .select({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        imagenUrl: producto.imagenUrl,
        precioEnDolares: producto.precioEnDolares,
        cambioDolar: producto.cambioDolar,
        costo: producto.costo,
        precioVenta: producto.precioVenta,

        gananciaUnidad: sql<number>`${producto.precioVenta} - ${producto.costo}`,

        existencias: sql<number>`
          (
            COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0)
          + COALESCE("ajustes"."cantidad", 0)
          )::float
        `,
      })
      .from(producto)
      .leftJoin(compras, eq(producto.id, compras.idProducto))
      .leftJoin(ventas, eq(producto.id, ventas.idProducto))
      .leftJoin(trasladosEntrada, eq(trasladosEntrada.idProducto, producto.id))
      .leftJoin(trasladosSalida, eq(trasladosSalida.idProducto, producto.id))
      .leftJoin(ajustes, eq(ajustes.idProducto, producto.id))
      .where(and(filterBySearch, filterByState))
      .orderBy(asc(producto.nombre))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(producto)
      .leftJoin(compras, eq(producto.id, compras.idProducto))
      .leftJoin(ventas, eq(producto.id, ventas.idProducto))
      .leftJoin(trasladosEntrada, eq(trasladosEntrada.idProducto, producto.id))
      .leftJoin(trasladosSalida, eq(trasladosSalida.idProducto, producto.id))
      .leftJoin(ajustes, eq(ajustes.idProducto, producto.id))
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
      .from(producto)
      .where(eq(producto.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el producto.');
  }
}

export async function getProductsSearchList(
  searchParams: SearchParamsProps,
  ubicacion: number
) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    producto.nombre,
    producto.codigo,
  ]);

  const filterByState = state
    ? sql`
        (
          COALESCE("compras"."cantidad", 0)
        - COALESCE("ventas"."cantidad", 0)
        + COALESCE("traslados_entrada"."cantidad", 0)
        - COALESCE("traslados_salida"."cantidad", 0)
        + COALESCE("ajustes"."cantidad", 0)
        ) > 0
      `
    : undefined;

  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida, ajustes } =
      await getStock(ubicacion);

    const products = await db
      .select({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        imagenUrl: producto.imagenUrl,
        costo: producto.costo,
        precioVenta: producto.precioVenta,
        precioVentaPorMayor: producto.precioVentaPorMayor,
        cambioDolar: producto.cambioDolar,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0)
          + COALESCE("ajustes"."cantidad", 0)
          )::float
        `,
        precioEnDolares: producto.precioEnDolares,
      })
      .from(producto)
      .leftJoin(compras, eq(compras.idProducto, producto.id))
      .leftJoin(ventas, eq(ventas.idProducto, producto.id))
      .leftJoin(trasladosEntrada, eq(trasladosEntrada.idProducto, producto.id))
      .leftJoin(trasladosSalida, eq(trasladosSalida.idProducto, producto.id))
      .leftJoin(ajustes, eq(ajustes.idProducto, producto.id))
      .where(and(filterBySearch, filterByState))
      .orderBy(asc(producto.nombre))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(producto)
      .leftJoin(compras, eq(compras.idProducto, producto.id))
      .leftJoin(ventas, eq(ventas.idProducto, producto.id))
      .leftJoin(trasladosEntrada, eq(trasladosEntrada.idProducto, producto.id))
      .leftJoin(trasladosSalida, eq(trasladosSalida.idProducto, producto.id))
      .leftJoin(ajustes, eq(ajustes.idProducto, producto.id))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { products, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los producto.');
  }
}
