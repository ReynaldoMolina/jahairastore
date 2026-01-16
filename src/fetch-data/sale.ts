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

function getTotal() {
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

  return { ventasTotal, compras };
}

export async function getSales(searchParams: SearchParamsProps) {
  const { query, limit, offset, state } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByClient(searchParams);

  const filterByState = state
    ? gt(sql<number>`ROUND(${venta.saldo}::numeric, 2)::float`, 0.01)
    : undefined;

  const { ventasTotal, compras } = getTotal();

  try {
    const data = await db
      .select({
        id: venta.id,
        nombreCliente: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        fecha: venta.fecha,
        credito: venta.credito,
        total: sql<number>`ROUND(COALESCE("ventas"."total", 0)::numeric, 2)::float`,
        saldo: sql<number>`
          CASE 
            WHEN ${venta.credito} = false THEN 0 
            ELSE ROUND(COALESCE("ventas"."total", 0)::numeric, 2)::float - COALESCE(${venta.abono}, 0)::float 
          END
        `,
        ganancia: sql<number>`ROUND(COALESCE("ventas"."total", 0)::numeric - COALESCE("compras"."total", 0)::numeric, 2)::float`,
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
  const saleId = Number(id);
  const { ventasTotal, compras } = getTotal();

  try {
    const [saleResult, detail] = await Promise.all([
      db
        .select({
          id: venta.id,
          idCliente: venta.idCliente,
          nombreCliente: cliente.nombre,
          apellidoCliente: cliente.apellido,
          telefono: cliente.telefono,
          fecha: venta.fecha,
          abono: venta.abono,
          credito: venta.credito,
          cambioDolar: venta.cambioDolar,
          idUbicacion: venta.idUbicacion,
          total: sql<number>`ROUND(COALESCE("ventas"."total", 0)::numeric, 2)::float`,
          saldo: sql<number>`
          CASE 
            WHEN ${venta.credito} = false THEN 0 
            ELSE ROUND(COALESCE("ventas"."total", 0)::numeric, 2)::float - COALESCE(${venta.abono}, 0)::float 
          END
        `,
        })
        .from(venta)
        .leftJoin(cliente, eq(venta.idCliente, cliente.id))
        .leftJoin(ventasTotal, eq(venta.id, ventasTotal.idVenta))
        .leftJoin(compras, eq(venta.id, compras.idVenta))
        .where(eq(venta.id, saleId)),

      db
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
        .where(eq(ventaDetalle.idVenta, saleId))
        .orderBy(desc(ventaDetalle.id)),
    ]);

    const sale = saleResult[0];

    if (!sale) throw new Error('Venta no encontrada');

    return {
      ...sale,
      detail,
    };
  } catch (error) {
    console.error(error);
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
  const saleId = Number(id);
  const { ventasTotal } = getTotal();

  try {
    const [businessInfo, saleResult, detail] = await Promise.all([
      getBusinessInfo(),

      db
        .select({
          id: venta.id,
          idCliente: venta.idCliente,
          fecha: venta.fecha,
          abono: venta.abono,
          credito: venta.credito,
          saldo: sql<number>`
          CASE 
            WHEN ${venta.credito} = false THEN 0 
            ELSE ROUND(COALESCE(${ventasTotal.total}, 0)::numeric, 2)::float - COALESCE(${venta.abono}, 0)::float 
          END
        `,
          nombreCliente: cliente.nombre,
          apellidoCliente: cliente.apellido,
        })
        .from(venta)
        .leftJoin(cliente, eq(venta.idCliente, cliente.id))
        .leftJoin(ventasTotal, eq(venta.id, ventasTotal.idVenta))
        .where(eq(venta.id, saleId))
        .groupBy(cliente.id, venta.id, ventasTotal.total),

      db
        .select({
          id: ventaDetalle.id,
          precioVenta: ventaDetalle.precioVenta,
          cantidad: ventaDetalle.cantidad,
          nombreProducto: producto.nombre,
          cambioDolar: ventaDetalle.cambioDolar,
        })
        .from(ventaDetalle)
        .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
        .where(eq(ventaDetalle.idVenta, saleId))
        .groupBy(ventaDetalle.id, producto.nombre)
        .orderBy(asc(producto.nombre)),
    ]);

    const sale = saleResult[0];
    if (!sale) throw new Error('Venta no encontrada');

    return {
      ...businessInfo,
      ...sale,
      detail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}
