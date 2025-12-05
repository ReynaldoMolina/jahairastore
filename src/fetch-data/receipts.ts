import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { db } from '@/database/db';
import { clientes, pedidosDetalles, recibos } from '@/database/schema/schema';
import { desc, eq, sql, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-by-search';
import { getBusinessInfo } from './settings';

export async function getReceipts(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  try {
    const data = await db
      .select({
        id: recibos.id,
        idPedido: recibos.idPedido,
        fecha: recibos.fecha,
        abono: recibos.abono,
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
      })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(filterBySearch)
      .orderBy(desc(recibos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los recibos');
  }
}

export async function getReceiptById(id: number | string) {
  try {
    const [data] = await db
      .select({
        id: recibos.id,
        idPedido: recibos.idPedido,
        idCliente: recibos.idCliente,
        nombreCliente: clientes.nombre,
        apellidoCliente: clientes.apellido,
        telefono: clientes.telefono,
        fecha: recibos.fecha,
        abono: recibos.abono,
        saldo: recibos.saldo,
        concepto: recibos.concepto,
      })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(eq(recibos.id, Number(id)));
    return data;
  } catch (error) {
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
        id: recibos.id,
        idPedido: recibos.idPedido,
        fecha: recibos.fecha,
        abono: recibos.abono,
        saldo: recibos.saldo,
        idCliente: recibos.idCliente,
        nombreCliente: clientes.nombre,
        apellidoCliente: clientes.apellido,
      })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(eq(recibos.id, Number(id)))
      .groupBy(clientes.id, recibos.id);

    const idPedido = receipt.idPedido;

    const orderdetail: ReciboPedidoDetalle[] = await db
      .select({
        id: pedidosDetalles.id,
        precioVenta: pedidosDetalles.precioVenta,
        cantidad: pedidosDetalles.cantidad,
        nombreProducto: pedidosDetalles.nombreProducto,
        imagenUrl: pedidosDetalles.imagenUrl,
      })
      .from(pedidosDetalles)
      .where(eq(pedidosDetalles.idPedido, Number(idPedido)))
      .groupBy(pedidosDetalles.id)
      .orderBy(asc(pedidosDetalles.nombreProducto));

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
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
        telefono: clientes.telefono,
      })
      .from(clientes)
      .where(eq(clientes.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el cliente del recibo.');
  }
}
