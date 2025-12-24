import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { db } from '@/database/db';
import { cliente, pedidoDetalle, recibo } from '@/database/schema/schema';
import { desc, eq, sql, asc } from 'drizzle-orm';
import { buildSearchFilterByOrder } from './build-by-search';
import { getBusinessInfo } from './settings';

export async function getReceipts(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByOrder(searchParams);

  try {
    const data = await db
      .select({
        id: recibo.id,
        idPedido: recibo.idPedido,
        fecha: recibo.fecha,
        abono: recibo.abono,
        nombreCliente: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        imagenUrl: cliente.imagenUrl,
      })
      .from(recibo)
      .leftJoin(cliente, eq(recibo.idCliente, cliente.id))
      .where(filterBySearch)
      .orderBy(desc(recibo.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(recibo)
      .leftJoin(cliente, eq(recibo.idCliente, cliente.id))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los recibo');
  }
}

export async function getReceiptById(id: number | string) {
  try {
    const [data] = await db
      .select({
        id: recibo.id,
        idPedido: recibo.idPedido,
        idCliente: recibo.idCliente,
        nombreCliente: cliente.nombre,
        apellidoCliente: cliente.apellido,
        telefono: cliente.telefono,
        fecha: recibo.fecha,
        saldoInicial: sql<number>`ROUND((${recibo.abono} + ${recibo.saldo})::numeric, 2)::float`,
        abono: recibo.abono,
        saldo: recibo.saldo,
        cambioDolar: recibo.cambioDolar,
        enCordobas: recibo.enCordobas,
        concepto: recibo.concepto,
      })
      .from(recibo)
      .leftJoin(cliente, eq(recibo.idCliente, cliente.id))
      .where(eq(recibo.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo.');
  }
}

export interface ReciboPedidoDetalle {
  id: number;
  precioVenta: number;
  cantidad: number;
  nombreProducto: string;
  imagenUrl: string | null;
}

export interface ReciboPedido {
  id: number;
  idPedido: number;
  fecha: string;
  abono: number;
  saldo: number;
  idCliente: number;
  nombreCliente: string;
  apellidoCliente: string;
}

export async function getPedidoReceiptPdf(id: number | string | undefined) {
  if (!id) return;

  try {
    const businessInfo = await getBusinessInfo();

    const [receipt]: ReciboPedido[] = await db
      .select({
        id: recibo.id,
        idPedido: recibo.idPedido,
        fecha: recibo.fecha,
        abono: recibo.abono,
        saldo: recibo.saldo,
        idCliente: recibo.idCliente,
        nombreCliente: cliente.nombre,
        apellidoCliente: cliente.apellido,
      })
      .from(recibo)
      .leftJoin(cliente, eq(recibo.idCliente, cliente.id))
      .where(eq(recibo.id, Number(id)))
      .groupBy(cliente.id, recibo.id);

    const idPedido = receipt.idPedido;

    const orderdetail: ReciboPedidoDetalle[] = await db
      .select({
        id: pedidoDetalle.id,
        precioVenta: pedidoDetalle.precioVenta,
        cantidad: pedidoDetalle.cantidad,
        nombreProducto: pedidoDetalle.nombreProducto,
        imagenUrl: pedidoDetalle.imagenUrl,
      })
      .from(pedidoDetalle)
      .where(eq(pedidoDetalle.idPedido, Number(idPedido)))
      .groupBy(pedidoDetalle.id)
      .orderBy(asc(pedidoDetalle.nombreProducto));

    return {
      ...businessInfo,
      ...receipt,
      detail: orderdetail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}

export async function getReceiptClientById(id: number | string) {
  try {
    const [data] = await db
      .select({
        nombreCliente: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        telefono: cliente.telefono,
      })
      .from(cliente)
      .where(eq(cliente.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el cliente del recibo.');
  }
}
