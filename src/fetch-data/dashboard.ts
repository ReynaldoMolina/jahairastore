import { getCurrentMonth } from '@/lib/get-date';
import { SearchParamsProps } from '@/types/types';
import { getSettingsCambioDolar } from './settings';
import { and, between, eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import {
  compra,
  compraDetalle,
  gasto,
  pedido,
  pedidoDetalle,
  recibo,
  venta,
  ventaDetalle,
} from '@/database/schema/schema';

export async function getTotalsDashboard(searchParams: SearchParamsProps) {
  const { start, end } = searchParams;
  const { firstDay, lastDay } = getCurrentMonth();

  const cambioDolar = (await getSettingsCambioDolar()) || 37;
  const startParam = start ? start : firstDay;
  const endParam = end ? end : lastDay;

  try {
    // Execute all independent database queries in parallel
    const [
      [salesContado],
      [salesCreditoAbonos],
      [ordersAbonos],
      [salesPurchases],
      [salesExpenses],
      [ordersCostsInDollars],
      [totalOrdersInDollars],
      [salesCosts],
    ] = await Promise.all([
      // 1. Sales Contado
      db
        .select({
          salesContado: sql<number>`COALESCE(ROUND(SUM((${ventaDetalle.precioVenta} * ${ventaDetalle.cantidad} * ${ventaDetalle.cambioDolar})::numeric), 2), 0)::float`,
        })
        .from(ventaDetalle)
        .leftJoin(venta, eq(ventaDetalle.idVenta, venta.id))
        .where(
          and(
            eq(venta.credito, false),
            between(venta.fecha, startParam, endParam)
          )
        ),

      // 2. Sales Credito Abonos
      db
        .select({
          salesCreditAbonos: sql<number>`COALESCE(ROUND(SUM(${venta.abono})::numeric, 2), 0)::float`,
        })
        .from(venta)
        .where(
          and(
            eq(venta.credito, true),
            between(venta.fecha, startParam, endParam)
          )
        ),

      // 3. Orders Abonos
      db
        .select({
          ordersAbonos: sql<number>`COALESCE(ROUND(SUM(${recibo.abono} * ${cambioDolar})::numeric, 2), 0)::float`,
        })
        .from(recibo)
        .where(between(recibo.fecha, startParam, endParam)),

      // 4. Sales Purchases
      db
        .select({
          comprasInventario: sql<number>`COALESCE(ROUND(SUM(${compraDetalle.precioCompra} * ${compraDetalle.cantidad} * ${compraDetalle.cambioDolar})::numeric, 2), 0)::float`,
        })
        .from(compraDetalle)
        .leftJoin(compra, eq(compraDetalle.idCompra, compra.id))
        .where(between(compra.fecha, startParam, endParam)),

      // 5. Sales Expenses
      db
        .select({
          comprasGastos: sql<number>`COALESCE(ROUND(SUM(${gasto.gasto} * ${gasto.cambioDolar})::numeric, 2), 0)::float`,
        })
        .from(gasto)
        .where(between(gasto.fecha, startParam, endParam)),

      // 6. Orders Costs In Dollars
      db
        .select({
          ordersCostsInDollars: sql<number>`COALESCE(ROUND(SUM(${pedidoDetalle.precioCompra} * ${pedidoDetalle.cantidad})::numeric, 2), 0)::float`,
        })
        .from(pedidoDetalle)
        .leftJoin(pedido, eq(pedidoDetalle.idPedido, pedido.id))
        .where(between(pedido.fecha, startParam, endParam)),

      // 7. Total Orders In Dollars
      db
        .select({
          totalOrdersInDollars: sql<number>`COALESCE(ROUND(SUM(${pedidoDetalle.precioVenta} * ${pedidoDetalle.cantidad})::numeric, 2), 0)::float`,
        })
        .from(pedidoDetalle)
        .leftJoin(pedido, eq(pedidoDetalle.idPedido, pedido.id))
        .where(between(pedido.fecha, startParam, endParam)),

      // 8. Sales Costs
      db
        .select({
          salesCosts: sql<number>`COALESCE(ROUND(SUM(${ventaDetalle.precioCompra} * ${ventaDetalle.cantidad} * ${ventaDetalle.cambioDolar})::numeric, 2), 0)::float`,
        })
        .from(ventaDetalle)
        .leftJoin(venta, eq(ventaDetalle.idVenta, venta.id))
        .where(between(venta.fecha, startParam, endParam)),
    ]);

    return {
      ...ordersCostsInDollars,
      ...totalOrdersInDollars,
      ...salesContado,
      ...salesCreditoAbonos,
      ...ordersAbonos,
      ...salesPurchases,
      ...salesExpenses,
      ordersCosts:
        (ordersCostsInDollars?.ordersCostsInDollars || 0) * cambioDolar,
      pedidosTotal:
        (totalOrdersInDollars?.totalOrdersInDollars || 0) * cambioDolar,
      ...salesCosts,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los totales.');
  }
}
