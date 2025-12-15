import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import {
  clientes,
  pedidos,
  pedidosDetalles,
  recibos,
} from '@/database/schema/schema';
import { and, eq, sql, desc } from 'drizzle-orm';
import { db } from '@/database/db';

export async function getOrders(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  const filterByState = state
    ? sql`ROUND(
      COALESCE("Ventas"."total", 0)::numeric -
      COALESCE("Abonos"."total", 0)::numeric,
      2
      )::double precision > 0`
    : undefined;

  try {
    const ventas = db
      .select({
        idPedido: pedidosDetalles.idPedido,
        total:
          sql<number>`SUM(${pedidosDetalles.precioVenta} * ${pedidosDetalles.cantidad})`.as(
            'total'
          ),
      })
      .from(pedidosDetalles)
      .groupBy(pedidosDetalles.idPedido)
      .as('Ventas');

    const compras = db
      .select({
        idPedido: pedidosDetalles.idPedido,
        total:
          sql<number>`SUM(${pedidosDetalles.precioCompra} * ${pedidosDetalles.cantidad})`.as(
            'total'
          ),
      })
      .from(pedidosDetalles)
      .groupBy(pedidosDetalles.idPedido)
      .as('Compras');

    const abonos = db
      .select({
        idPedido: recibos.idPedido,
        total: sql<number>`SUM(${recibos.abono})`.as('total'),
      })
      .from(recibos)
      .groupBy(recibos.idPedido)
      .as('Abonos');

    const data = await db
      .select({
        id: pedidos.id,
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
        imagenUrl: clientes.imagenUrl,
        fecha: pedidos.fecha,
        total: sql<number>`COALESCE("Ventas"."total", 0)`,
        abonos: sql<number>`COALESCE("Abonos"."total", 0)`,
        saldo: sql<number>`COALESCE("Ventas"."total", 0) - COALESCE("Abonos"."total", 0)`,
        ganancia: sql<number>`COALESCE("Ventas"."total", 0) - COALESCE("Compras"."total", 0)`,
      })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.idCliente, clientes.id))
      .leftJoin(ventas, eq(pedidos.id, ventas.idPedido))
      .leftJoin(compras, eq(pedidos.id, compras.idPedido))
      .leftJoin(abonos, eq(pedidos.id, abonos.idPedido))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(pedidos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.idCliente, clientes.id))
      .leftJoin(ventas, eq(pedidos.id, ventas.idPedido))
      .leftJoin(compras, eq(pedidos.id, compras.idPedido))
      .leftJoin(abonos, eq(pedidos.id, abonos.idPedido))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los pedidos');
  }
}

export async function getOrderById(id: number | string) {
  try {
    const abonos = db
      .select({
        idPedido: recibos.idPedido,
        total: sql<number>`SUM(${recibos.abono})`.as('total'),
      })
      .from(recibos)
      .groupBy(recibos.idPedido)
      .as('Abonos');

    const [order] = await db
      .select({
        id: pedidos.id,
        idCliente: pedidos.idCliente,
        fecha: pedidos.fecha,
        nombreCliente: clientes.nombre,
        telefono: clientes.telefono,
        peso: pedidos.peso,
        cambioDolar: pedidos.cambioDolar,
        precioLibra: pedidos.precioLibra,
        tipoEnvio: pedidos.tipoEnvio,
        abonos: sql<number>`COALESCE("Abonos"."total", 0)`,
      })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.idCliente, clientes.id))
      .leftJoin(abonos, eq(pedidos.id, abonos.idPedido))
      .where(eq(pedidos.id, Number(id)));

    const detail = await db
      .select()
      .from(pedidosDetalles)
      .where(eq(pedidosDetalles.idPedido, Number(id)))
      .orderBy(desc(pedidosDetalles.id));

    return {
      ...order,
      detail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el pedido.');
  }
}
