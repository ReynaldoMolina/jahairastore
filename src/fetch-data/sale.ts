import { db } from '@/database/db';
import {
  cliente,
  producto,
  venta,
  ventaDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and, gt, asc, between } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { getBusinessInfo } from './settings';
import { buildSearchFilterByClient } from './build-by-search';
import { getCurrentMonth } from '@/lib/get-date';

function getTotal() {
  const ventas = db
    .select({
      idVenta: ventaDetalle.idVenta,
      total: sql<number>`
      SUM(
        CASE
          WHEN ${ventaDetalle.precioPorMayor}
            THEN ${ventaDetalle.precioVentaPorMayor} * ${ventaDetalle.cantidad}
          ELSE ${ventaDetalle.precioVenta} * ${ventaDetalle.cantidad}
        END
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
        sql<number>`SUM(${ventaDetalle.costo} * ${ventaDetalle.cantidad})`.as(
          'total'
        ),
    })
    .from(ventaDetalle)
    .groupBy(ventaDetalle.idVenta)
    .as('compras');

  return { ventas, compras };
}

export async function getSales(searchParams: SearchParamsProps) {
  const { query, limit, offset, state } = getUrlParams(searchParams);
  const { start, end } = searchParams;
  const { firstDay, lastDay } = getCurrentMonth();

  const startParam = start ? start : firstDay;
  const endParam = end ? end : lastDay;

  const filterBySearch = buildSearchFilterByClient(searchParams);

  const saldoCalculated = sql<number>`
    CASE 
      WHEN ${venta.credito} = false THEN 0 
      ELSE ROUND(COALESCE("ventas"."total", 0)::numeric, 2)::float - COALESCE(${venta.abono}, 0)::float 
    END
  `;

  const filterByState = state
    ? gt(saldoCalculated, 0) // Filter using the calculation, not the column
    : undefined;

  const { ventas, compras } = getTotal();

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
      .leftJoin(ventas, eq(venta.id, ventas.idVenta))
      .leftJoin(compras, eq(venta.id, compras.idVenta))
      .where(
        and(
          filterBySearch,
          filterByState,
          between(venta.fecha, startParam, endParam)
        )
      )
      .orderBy(desc(venta.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(venta)
      .leftJoin(cliente, eq(venta.idCliente, cliente.id))
      .leftJoin(ventas, eq(venta.id, ventas.idVenta))
      .leftJoin(compras, eq(venta.id, compras.idVenta))
      .where(
        and(
          filterBySearch,
          filterByState,
          between(venta.fecha, startParam, endParam)
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
  const saleId = Number(id);
  const { ventas, compras } = getTotal();

  try {
    const [sale, detail] = await Promise.all([
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
        .leftJoin(ventas, eq(venta.id, ventas.idVenta))
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
          costo: ventaDetalle.costo,
          cantidad: ventaDetalle.cantidad,
          cambioDolar: ventaDetalle.cambioDolar,
          precioPorMayor: ventaDetalle.precioPorMayor,
          imagenUrl: producto.imagenUrl,
        })
        .from(ventaDetalle)
        .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
        .where(eq(ventaDetalle.idVenta, saleId))
        .orderBy(asc(ventaDetalle.id)),
    ]);

    return {
      ...sale[0],
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
  const { ventas } = getTotal();

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
            ELSE ROUND(COALESCE(${ventas.total}, 0)::numeric, 2)::float - COALESCE(${venta.abono}, 0)::float 
          END
        `,
          nombreCliente: cliente.nombre,
          apellidoCliente: cliente.apellido,
        })
        .from(venta)
        .leftJoin(cliente, eq(venta.idCliente, cliente.id))
        .leftJoin(ventas, eq(venta.id, ventas.idVenta))
        .where(eq(venta.id, saleId))
        .groupBy(cliente.id, venta.id, ventas.total),

      db
        .select({
          id: ventaDetalle.id,
          precioVenta: sql<number>`
          CASE
            WHEN ${ventaDetalle.precioPorMayor}
              THEN ${ventaDetalle.precioVentaPorMayor}
            ELSE ${ventaDetalle.precioVenta}
          END`,
          cantidad: ventaDetalle.cantidad,
          nombreProducto: producto.nombre,
          cambioDolar: ventaDetalle.cambioDolar,
        })
        .from(ventaDetalle)
        .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
        .where(eq(ventaDetalle.idVenta, saleId))
        .groupBy(ventaDetalle.id, producto.nombre)
        .orderBy(asc(ventaDetalle.id)),
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
