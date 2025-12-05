import { getCurrentMonth } from '@/lib/get-date';
import { SearchParamsProps } from '@/types/types';
import { getSettingsCambioDolar } from './settings';
import { and, between, eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import {
  compras,
  comprasDetalles,
  egresos,
  pedidos,
  pedidosDetalles,
  recibos,
  ventas,
  ventasDetalles,
} from '@/database/schema/schema';

export async function getTotalsDashboard(searchParams: SearchParamsProps) {
  const { start, end } = searchParams;
  const { firstDay, lastDay } = getCurrentMonth();

  const cambioDolar = (await getSettingsCambioDolar()) || 37;
  const startParam = start ? start : firstDay;
  const endParam = end ? end : lastDay;

  try {
    const [salesContado] = await db
      .select({
        salesContado: sql<number>`COALESCE(ROUND(SUM((${ventasDetalles.precioVenta} * ${ventasDetalles.cantidad} * ${ventasDetalles.cambioDolar})::numeric), 2), 0)::float`,
      })
      .from(ventasDetalles)
      .leftJoin(ventas, eq(ventasDetalles.idVenta, ventas.id))
      .where(
        and(
          eq(ventas.credito, false),
          between(ventas.fecha, startParam, endParam)
        )
      );

    const [salesCreditoAbonos] = await db
      .select({
        salesCreditAbonos: sql<number>`COALESCE(ROUND(SUM(${ventas.abono})::numeric, 2), 0)::float`,
      })
      .from(ventas)
      .where(
        and(
          eq(ventas.credito, true),
          between(ventas.fecha, startParam, endParam)
        )
      );

    const [ordersAbonos] = await db
      .select({
        ordersAbonos: sql<number>`COALESCE(ROUND(SUM(${recibos.abono} * ${cambioDolar})::numeric, 2), 0)::float`,
      })
      .from(recibos)
      .where(between(recibos.fecha, startParam, endParam));

    const [salesPurchases] = await db
      .select({
        comprasInventario: sql<number>`COALESCE(ROUND(SUM(${comprasDetalles.precioCompra} * ${comprasDetalles.cantidad} * ${comprasDetalles.cambioDolar})::numeric, 2), 0)::float`,
      })
      .from(comprasDetalles)
      .leftJoin(compras, eq(comprasDetalles.idCompra, compras.id))
      .where(between(compras.fecha, startParam, endParam));

    const [salesExpenses] = await db
      .select({
        comprasGastos: sql<number>`
          COALESCE(
            ROUND(
              SUM(${egresos.gasto} * ${egresos.cambioDolar})::numeric,
            2),
          0)::float
        `,
      })
      .from(egresos)
      .where(between(egresos.fecha, startParam, endParam));

    const [ordersCostsInDollars] = await db
      .select({
        ordersCostsInDollars: sql<number>`
          COALESCE(
            ROUND(
              SUM(${pedidosDetalles.precioCompra} * ${pedidosDetalles.cantidad})::numeric,
            2),
          0)::float
        `,
      })
      .from(pedidosDetalles)
      .leftJoin(pedidos, eq(pedidosDetalles.idPedido, pedidos.id))
      .where(between(pedidos.fecha, startParam, endParam));

    const [totalOrdersInDollars] = await db
      .select({
        totalOrdersInDollars: sql<number>`
          COALESCE(
            ROUND(
              SUM(
                ${pedidosDetalles.precioVenta} 
                * ${pedidosDetalles.cantidad}
              )::numeric,
            2),
          0)::float
        `,
      })
      .from(pedidosDetalles)
      .leftJoin(pedidos, eq(pedidosDetalles.idPedido, pedidos.id))
      .where(between(pedidos.fecha, startParam, endParam));

    const [salesCosts] = await db
      .select({
        salesCosts: sql<number>`
      COALESCE(
        ROUND(
          SUM(
            ${ventasDetalles.precioCompra}
            * ${ventasDetalles.cantidad}
            * ${ventasDetalles.cambioDolar}
          )::numeric,
        2),
      0)::float
    `,
      })
      .from(ventasDetalles)
      .leftJoin(ventas, eq(ventasDetalles.idVenta, ventas.id))
      .where(between(ventas.fecha, startParam, endParam));

    return {
      ...ordersCostsInDollars,
      ...totalOrdersInDollars,
      ...salesContado,
      ...salesCreditoAbonos,
      ...ordersAbonos,
      ...salesPurchases,
      ...salesExpenses,
      ordersCosts: ordersCostsInDollars.ordersCostsInDollars * cambioDolar,
      pedidosTotal: totalOrdersInDollars.totalOrdersInDollars * cambioDolar,
      ...salesCosts,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los totales.');
  }
}
