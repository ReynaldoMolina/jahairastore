import { db } from '@/database/db';
import {
  clientes,
  configuracion,
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
        credito: ventas.credito,
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
    const [businessInfo] = await db
      .select({
        nombreEmpresa: configuracion.nombreEmpresa,
        eslogan: configuracion.eslogan,
      })
      .from(configuracion)
      .where(eq(configuracion.id, Number(1)));

    const [sale] = await db
      .select({
        id: ventas.id,
        idCliente: ventas.idCliente,
        nombreCliente: clientes.nombre,
        apellidoCliente: clientes.apellido,
        fecha: ventas.fecha,
        abono: ventas.abono,
        credito: ventas.credito,
        saldo: ventas.saldo,
        cambioDolar: ventas.cambioDolar,
      })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .where(eq(ventas.id, Number(id)));

    const detail = await db
      .select({
        id: ventasDetalles.id,
        idProducto: ventasDetalles.idProducto,
        nombre: productos.nombre,
        precioVenta: ventasDetalles.precioVenta,
        precioCompra: ventasDetalles.precioCompra,
        cantidad: ventasDetalles.cantidad,
        cambioDolar: ventasDetalles.cambioDolar,
        idVenta: ventasDetalles.idVenta,
      })
      .from(ventasDetalles)
      .leftJoin(productos, eq(ventasDetalles.idProducto, productos.id))
      .where(eq(ventasDetalles.idVenta, Number(id)))
      .orderBy(desc(ventasDetalles.id));

    return {
      ...businessInfo,
      ...sale,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener la venta.');
  }
}
