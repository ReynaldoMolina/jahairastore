import { db } from '@/database/db';
import {
  cliente,
  ajustes,
  producto,
  venta,
  ventaDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and, gt, asc } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { getBusinessInfo } from './settings';
import { buildSearchFilterByClient } from './build-by-search';

export async function getSales(searchParams: SearchParamsProps) {
  const { query, limit, offset, state } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByClient(searchParams);

  const filterByState = state
    ? gt(sql<number>`ROUND(${venta.saldo}::numeric, 2)::float`, 0.01)
    : undefined;

  try {
    const ventasTotal = db
      .select({
        idVenta: ventaDetalle.idVenta,
        total: sql<number>`
      SUM(
        CASE
          WHEN ${ventaDetalle.precioPorMayor}
            THEN ${ventaDetalle.precioVentaPorMayor} * ${ventaDetalle.cantidad}
          ELSE ${ventaDetalle.precioVenta} * ${ventaDetalle.cantidad}
        END
        * ${ventaDetalle.cambioDolar}
      )
    `.as('total'),
      })
      .from(ventaDetalle)
      .groupBy(ventaDetalle.idVenta)
      .as('ventas');

    const compras = db
      .select({
        idVenta: ventaDetalle.idVenta,
        total:
          sql<number>`SUM(${ventaDetalle.precioCompra} * ${ventaDetalle.cantidad} * ${ventaDetalle.cambioDolar})`.as(
            'total'
          ),
      })
      .from(ventaDetalle)
      .groupBy(ventaDetalle.idVenta)
      .as('compras');

    const data = await db
      .select({
        id: venta.id,
        nombreCliente: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        imagenUrl: cliente.imagenUrl,
        abono: venta.abono,
        fecha: venta.fecha,
        credito: venta.credito,
        total: sql<number>`COALESCE("ventas"."total", 0)`,
        saldo: sql<number>`COALESCE(${venta.saldo}, 0)`,
        ganancia: sql<number>`COALESCE("ventas"."total", 0) - COALESCE("compras"."total", 0)`,
      })
      .from(venta)
      .leftJoin(cliente, eq(venta.idCliente, cliente.id))
      .leftJoin(ventasTotal, eq(venta.id, ventasTotal.idVenta))
      .leftJoin(compras, eq(venta.id, compras.idVenta))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(venta.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(venta)
      .leftJoin(cliente, eq(venta.idCliente, cliente.id))
      .leftJoin(ventasTotal, eq(venta.id, ventasTotal.idVenta))
      .leftJoin(compras, eq(venta.id, compras.idVenta))
      .where(and(filterBySearch, filterByState));

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
        nombreEmpresa: ajustes.nombreEmpresa,
        eslogan: ajustes.eslogan,
      })
      .from(ajustes)
      .where(eq(ajustes.id, Number(1)));

    const [sale] = await db
      .select({
        id: venta.id,
        idCliente: venta.idCliente,
        nombreCliente: cliente.nombre,
        apellidoCliente: cliente.apellido,
        telefono: cliente.telefono,
        fecha: venta.fecha,
        abono: venta.abono,
        credito: venta.credito,
        saldo: venta.saldo,
        cambioDolar: venta.cambioDolar,
      })
      .from(venta)
      .leftJoin(cliente, eq(venta.idCliente, cliente.id))
      .where(eq(venta.id, Number(id)));

    const detail = await db
      .select({
        id: ventaDetalle.id,
        idVenta: ventaDetalle.idVenta,
        idProducto: ventaDetalle.idProducto,
        nombre: producto.nombre,
        precioVenta: ventaDetalle.precioVenta,
        precioVentaPorMayor: ventaDetalle.precioVentaPorMayor,
        precioCompra: ventaDetalle.precioCompra,
        cantidad: ventaDetalle.cantidad,
        cambioDolar: ventaDetalle.cambioDolar,
        precioPorMayor: ventaDetalle.precioPorMayor,
      })
      .from(ventaDetalle)
      .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
      .where(eq(ventaDetalle.idVenta, Number(id)))
      .orderBy(desc(ventaDetalle.id));

    return {
      ...businessInfo,
      ...sale,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener la venta.');
  }
}

export interface ReciboVentaDetalle {
  id: number;
  precioVenta: number;
  cantidad: number;
  nombreProducto: string;
  cambioDolar: number;
}

export interface ReciboVenta {
  id: number;
  idCliente: number;
  fecha: string;
  abono: number;
  credito: boolean;
  saldo: number;
  nombreCliente: string;
  apellidoCliente: string;
}

export async function getSaleReceiptPdf(id: number | string | undefined) {
  if (!id) return;

  try {
    const businessInfo = await getBusinessInfo();

    const [sale]: ReciboVenta[] = await db
      .select({
        id: venta.id,
        idCliente: venta.idCliente,
        fecha: venta.fecha,
        abono: venta.abono,
        credito: venta.credito,
        saldo: venta.saldo,
        nombreCliente: cliente.nombre,
        apellidoCliente: cliente.apellido,
      })
      .from(venta)
      .leftJoin(cliente, eq(venta.idCliente, cliente.id))
      .where(eq(venta.id, Number(id)))
      .groupBy(cliente.id, venta.id);

    const saledetail: ReciboVentaDetalle[] = await db
      .select({
        id: ventaDetalle.id,
        precioVenta: ventaDetalle.precioVenta,
        cantidad: ventaDetalle.cantidad,
        nombreProducto: producto.nombre,
        cambioDolar: ventaDetalle.cambioDolar,
      })
      .from(ventaDetalle)
      .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
      .where(eq(ventaDetalle.idVenta, Number(sale.id)))
      .groupBy(ventaDetalle.id, producto.nombre)
      .orderBy(asc(producto.nombre));

    return {
      ...businessInfo,
      ...sale,
      detail: saledetail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}
