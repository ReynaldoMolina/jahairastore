import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import {
  cliente,
  pedido,
  pedidoDetalle,
  recibo,
} from '@/database/schema/schema';
import { and, eq, sql, desc } from 'drizzle-orm';
import { db } from '@/database/db';
import { buildSearchFilterByClient } from './build-by-search';

export async function getOrders(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByClient(searchParams);

  const filterByState = state
    ? sql`ROUND(
      COALESCE("ventas"."total", 0)::numeric -
      COALESCE("abonos"."total", 0)::numeric,
      2
      )::float > 0`
    : undefined;

  try {
    const ventas = db
      .select({
        idPedido: pedidoDetalle.idPedido,
        total:
          sql<number>`ROUND(SUM(${pedidoDetalle.precioVenta} * ${pedidoDetalle.cantidad})::numeric, 2)::float`.as(
            'total'
          ),
      })
      .from(pedidoDetalle)
      .groupBy(pedidoDetalle.idPedido)
      .as('ventas');

    const compras = db
      .select({
        idPedido: pedidoDetalle.idPedido,
        total:
          sql<number>`ROUND(SUM(${pedidoDetalle.precioCompra} * ${pedidoDetalle.cantidad})::numeric, 2)::float`.as(
            'total'
          ),
      })
      .from(pedidoDetalle)
      .groupBy(pedidoDetalle.idPedido)
      .as('compras');

    const abonos = db
      .select({
        idPedido: recibo.idPedido,
        total: sql<number>`ROUND(SUM(${recibo.abono})::numeric, 2)::float`.as(
          'total'
        ),
      })
      .from(recibo)
      .groupBy(recibo.idPedido)
      .as('abonos');

    const data = await db
      .select({
        id: pedido.id,
        nombreCliente: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        imagenUrl: cliente.imagenUrl,
        fecha: pedido.fecha,
        envio: pedido.tipoEnvio,
        total: sql<number>`COALESCE("ventas"."total", 0)`,
        saldo: sql<number>`COALESCE("ventas"."total", 0) - COALESCE("abonos"."total", 0)`,
        ganancia: sql<number>`ROUND(COALESCE("ventas"."total", 0)::numeric - COALESCE("compras"."total", 0)::numeric, 2)::float`,
      })
      .from(pedido)
      .leftJoin(cliente, eq(pedido.idCliente, cliente.id))
      .leftJoin(ventas, eq(pedido.id, ventas.idPedido))
      .leftJoin(compras, eq(pedido.id, compras.idPedido))
      .leftJoin(abonos, eq(pedido.id, abonos.idPedido))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(pedido.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(pedido)
      .leftJoin(cliente, eq(pedido.idCliente, cliente.id))
      .leftJoin(ventas, eq(pedido.id, ventas.idPedido))
      .leftJoin(compras, eq(pedido.id, compras.idPedido))
      .leftJoin(abonos, eq(pedido.id, abonos.idPedido))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los pedido');
  }
}

export async function getOrderById(id: number | string) {
  try {
    const abonos = db
      .select({
        idPedido: recibo.idPedido,
        total: sql<number>`SUM(${recibo.abono})`.as('total'),
      })
      .from(recibo)
      .groupBy(recibo.idPedido)
      .as('abonos');

    const [order] = await db
      .select({
        id: pedido.id,
        idCliente: pedido.idCliente,
        fecha: pedido.fecha,
        nombreCliente: cliente.nombre,
        telefono: cliente.telefono,
        peso: pedido.peso,
        cambioDolar: pedido.cambioDolar,
        precioLibra: pedido.precioLibra,
        tipoEnvio: pedido.tipoEnvio,
        abonos: sql<number>`COALESCE("abonos"."total", 0)`,
      })
      .from(pedido)
      .leftJoin(cliente, eq(pedido.idCliente, cliente.id))
      .leftJoin(abonos, eq(pedido.id, abonos.idPedido))
      .where(eq(pedido.id, Number(id)));

    const detail = await db
      .select()
      .from(pedidoDetalle)
      .where(eq(pedidoDetalle.idPedido, Number(id)))
      .orderBy(desc(pedidoDetalle.id));

    return {
      ...order,
      detail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el pedido.');
  }
}
