import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilterByProvider } from './build-by-search';
import {
  compra,
  compraDetalle,
  gasto,
  producto,
  proveedor,
} from '@/database/schema/schema';
import { db } from '@/database/db';
import { desc, eq, sql, asc, between, and } from 'drizzle-orm';
import { getCurrentMonth } from '@/lib/get-date';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const { start, end } = searchParams;
  const { firstDay, lastDay } = getCurrentMonth();
  const startParam = start ? start : firstDay;
  const endParam = end ? end : lastDay;

  const filterBySearch = buildSearchFilterByProvider(searchParams);

  try {
    const compras = db
      .select({
        idCompra: compraDetalle.idCompra,
        total:
          sql<number>`SUM(${compraDetalle.costo} * ${compraDetalle.cantidad})`.as(
            'total'
          ),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idCompra)
      .as('compras');

    const gastos = db
      .select({
        idCompra: gasto.idCompra,
        total: sql<number>`SUM(${gasto.gasto})`.as('total'),
      })
      .from(gasto)
      .groupBy(gasto.idCompra)
      .as('gastos');

    const data = await db
      .select({
        id: compra.id,
        nombreProveedor: proveedor.nombreEmpresa,
        fecha: compra.fecha,
        total: sql<number>`round(COALESCE("compras"."total", 0)::numeric + COALESCE("gastos"."total", 0)::numeric, 2)::float`,
      })
      .from(compra)
      .leftJoin(gastos, eq(compra.id, gastos.idCompra))
      .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
      .leftJoin(compras, eq(compra.id, compras.idCompra))
      .where(and(filterBySearch, between(compra.fecha, startParam, endParam)))
      .orderBy(desc(compra.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(compra)
      .leftJoin(gastos, eq(compra.id, gastos.idCompra))
      .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
      .leftJoin(compras, eq(compra.id, compras.idCompra))
      .where(and(filterBySearch, between(compra.fecha, startParam, endParam)));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las compra.');
  }
}

export async function getPurchaseById(id: number | string) {
  try {
    const gastos = db
      .select({
        idCompra: gasto.idCompra,
        total: sql<number>`SUM(${gasto.gasto})`.as('total'),
      })
      .from(gasto)
      .groupBy(gasto.idCompra)
      .as('gastos');

    const [purchase, detail] = await Promise.all([
      db
        .select({
          id: compra.id,
          idProveedor: compra.idProveedor,
          idUbicacion: compra.idUbicacion,
          nombreEmpresa: proveedor.nombreEmpresa,
          fecha: compra.fecha,
          gastos: sql<number>`COALESCE(${gastos.total}, 0)`,
        })
        .from(compra)
        .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
        .leftJoin(gastos, eq(compra.id, gastos.idCompra))
        .where(eq(compra.id, Number(id))),

      db
        .select({
          id: compraDetalle.id,
          idCompra: compraDetalle.idCompra,
          idProducto: compraDetalle.idProducto,
          costo: compraDetalle.costo,
          cantidad: compraDetalle.cantidad,
          cambioDolar: compraDetalle.cambioDolar,
          nombreProducto: producto.nombre,
          imagenUrl: producto.imagenUrl,
        })
        .from(compraDetalle)
        .leftJoin(producto, eq(compraDetalle.idProducto, producto.id))
        .where(eq(compraDetalle.idCompra, Number(id)))
        .orderBy(desc(compraDetalle.id)),
    ]);

    return {
      ...purchase[0],
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener la compra.');
  }
}

export async function getProvidersSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${proveedor.id} AS TEXT)`,
        label: proveedor.nombreEmpresa,
      })
      .from(proveedor)
      .orderBy(asc(proveedor.nombreEmpresa));

    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedor.');
  }
}
