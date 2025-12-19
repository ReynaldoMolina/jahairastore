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
import { desc, eq, sql, asc } from 'drizzle-orm';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByProvider(searchParams);

  try {
    const ventas = db
      .select({
        idCompra: compraDetalle.idCompra,
        total:
          sql<number>`SUM(${compraDetalle.precioVenta} * ${compraDetalle.cantidad} * ${compraDetalle.cambioDolar})`.as(
            'total'
          ),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idCompra)
      .as('ventas');

    const comprasTotal = db
      .select({
        idCompra: compraDetalle.idCompra,
        total:
          sql<number>`SUM(${compraDetalle.precioCompra} * ${compraDetalle.cantidad} * ${compraDetalle.cambioDolar})`.as(
            'total'
          ),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idCompra)
      .as('compras');

    const gastos = db
      .select({
        idCompra: gasto.idCompra,
        total: sql<number>`SUM(${gasto.gasto} * ${gasto.cambioDolar})`.as(
          'total'
        ),
      })
      .from(gasto)
      .groupBy(gasto.idCompra)
      .as('gastos');

    const data = await db
      .select({
        id: compra.id,
        nombreProveedor: proveedor.nombreEmpresa,
        imagenUrl: proveedor.imagenUrl,
        fecha: compra.fecha,
        total: sql<number>`COALESCE("compras"."total", 0)`,
        gastos: sql<number>`COALESCE("gastos"."total", 0)`,
        ganancia: sql<number>`COALESCE("ventas"."total", 0) - COALESCE("compras"."total", 0)`,
      })
      .from(compra)
      .leftJoin(gastos, eq(compra.id, gastos.idCompra))
      .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
      .leftJoin(ventas, eq(compra.id, ventas.idCompra))
      .leftJoin(comprasTotal, eq(compra.id, comprasTotal.idCompra))
      .where(filterBySearch)
      .orderBy(desc(compra.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(compra)
      .leftJoin(gastos, eq(compra.id, gastos.idCompra))
      .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
      .leftJoin(ventas, eq(compra.id, ventas.idCompra))
      .leftJoin(comprasTotal, eq(compra.id, comprasTotal.idCompra))
      .where(filterBySearch);

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
        total: sql<number>`SUM(${gasto.gasto} * ${gasto.cambioDolar})`.as(
          'total'
        ),
      })
      .from(gasto)
      .groupBy(gasto.idCompra)
      .as('gastos');

    const [purchase] = await db
      .select({
        id: compra.id,
        idProveedor: compra.idProveedor,
        nombreEmpresa: proveedor.nombreEmpresa,
        fecha: compra.fecha,
        gastos: sql<number>`COALESCE(${gastos.total}, 0)`,
      })
      .from(compra)
      .leftJoin(proveedor, eq(compra.idProveedor, proveedor.id))
      .leftJoin(gastos, eq(compra.id, gastos.idCompra))
      .where(eq(compra.id, Number(id)));

    const detail = await db
      .select({
        id: compraDetalle.id,
        idCompra: compraDetalle.idCompra,
        idProducto: compraDetalle.idProducto,
        precioCompra: compraDetalle.precioCompra,
        cantidad: compraDetalle.cantidad,
        precioVenta: compraDetalle.precioVenta,
        cambioDolar: compraDetalle.cambioDolar,
        nombreProducto: producto.nombre,
      })
      .from(compraDetalle)
      .leftJoin(producto, eq(compraDetalle.idProducto, producto.id))
      .where(eq(compraDetalle.idCompra, Number(id)))
      .orderBy(desc(compraDetalle.id));

    return {
      ...purchase,
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
