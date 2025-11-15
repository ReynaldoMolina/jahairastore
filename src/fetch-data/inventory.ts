import { db } from '@/database/db';
import { getUrlParams } from './filter';
import {
  comprasDetalles,
  productos,
  ventasDetalles,
} from '@/database/schema/schema';
import { sql, eq, and, desc } from 'drizzle-orm';
import { buildSearchFilter } from './build-by-search';
import { SearchParamsProps } from '@/types/types';

export async function getInventory(searchParams: SearchParamsProps) {
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
        precioVenta: productos.precioVenta,
        precioCompra: productos.precioCompra,
        cambioDolar: productos.cambioDolar,
        precioEnCordobas: productos.precioEnCordobas,
        existencias: sql<number>`
          (COALESCE("Compras"."cantidad", 0)
          - COALESCE("Ventas"."cantidad", 0))::integer
        `,
        ganancia: sql<number>`
          (
            (COALESCE("Compras"."cantidad", 0) - COALESCE("Ventas"."cantidad", 0))
            * (${productos.precioVenta} - ${productos.precioCompra})
          )`,
      })
      .from(productos)
      .leftJoin(compras, eq(productos.id, compras.idProducto))
      .leftJoin(ventas, eq(productos.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(productos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(productos)
      .leftJoin(compras, eq(productos.id, compras.idProducto))
      .leftJoin(ventas, eq(productos.id, ventas.idProducto))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el inventario.');
  }
}
