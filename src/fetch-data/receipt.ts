import { db } from '@/database/db';
import { getBusinessInfo } from './settings';
import {
  clientes,
  pedidosDetalles,
  productos,
  recibos,
} from '@/database/schema/schema';
import { asc, eq } from 'drizzle-orm';

export interface ReciboPedidoDetalle {
  id: number;
  precioVenta: number;
  cantidad: number;
  producto: string;
}

export interface ReciboPedido {
  id: number;
  idPedido: number;
  fecha: string;
  abono: number;
  saldo: number;
  idCliente: number;
  nombre: string;
  apellido: string;
}

export async function getPedidoReceiptPdf(id: number | string | undefined) {
  if (!id) return;

  try {
    const businessInfo = await getBusinessInfo(1);

    const [order]: ReciboPedido[] = await db
      .select({
        id: recibos.id,
        idPedido: recibos.idPedido,
        fecha: recibos.fecha,
        abono: recibos.abono,
        saldo: recibos.saldo,
        idCliente: recibos.idCliente,
        nombre: clientes.nombre,
        apellido: clientes.apellido,
      })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(eq(recibos.id, Number(id)))
      .groupBy(clientes.id, recibos.id);

    const idPedido = order.idPedido;

    const orderdetail: ReciboPedidoDetalle[] = await db
      .select({
        id: pedidosDetalles.id,
        precioVenta: pedidosDetalles.precioVenta,
        cantidad: pedidosDetalles.cantidad,
        producto: productos.nombre,
      })
      .from(pedidosDetalles)
      .leftJoin(productos, eq(pedidosDetalles.idProducto, productos.id))
      .where(eq(pedidosDetalles.idPedido, Number(idPedido)))
      .groupBy(productos.id, pedidosDetalles.id)
      .orderBy(asc(productos.nombre));

    return {
      ...businessInfo,
      ...order,
      detail: orderdetail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}
