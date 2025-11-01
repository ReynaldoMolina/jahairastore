import { db } from '@/database/db';
import {
  clientes,
  productos,
  ventas,
  ventasDetalles,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and, gt } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getSales(searchParams: SearchParamsProps) {
  const { query, limit, offset, state } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  try {
    const data = await db
      .select({
        id: ventas.id,
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
        abono: ventas.abono,
        fecha: ventas.fecha,
        totalVenta: sql<number>`
          COALESCE(ROUND(SUM(${ventasDetalles.precioVenta} * ${ventasDetalles.cantidad} * ${ventasDetalles.cambioDolar})::numeric, 2)::float, 0)
        `,
        totalCompra: sql<number>`
          COALESCE(ROUND(SUM(${ventasDetalles.precioCompra} * ${ventasDetalles.cantidad} * ${ventasDetalles.cambioDolar})::numeric, 2)::float, 0)
        `,
        saldo: ventas.saldo,
      })
      .from(ventas)
      .leftJoin(ventasDetalles, eq(ventas.id, ventasDetalles.idVenta))
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .where(
        and(
          filterBySearch,
          state
            ? gt(sql<number>`ROUND(${ventas.saldo}::numeric, 2)::float`, 0)
            : undefined
        )
      )
      .groupBy(
        ventas.id,
        clientes.nombre,
        clientes.apellido,
        ventas.abono,
        ventas.fecha,
        ventas.saldo
      )
      .orderBy(desc(ventas.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .where(
        and(
          filterBySearch,
          state
            ? gt(sql<number>`ROUND(${ventas.saldo}::numeric, 2)::float`, 0)
            : undefined
        )
      );

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las ventas.');
  }
}

export async function getSaleById(id: number | string) {
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
