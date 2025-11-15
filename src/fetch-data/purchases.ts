import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import {
  compras,
  comprasDetalles,
  egresos,
  productos,
  proveedores,
} from '@/database/schema/schema';
import { db } from '@/database/db';
import { desc, eq, sql, asc } from 'drizzle-orm';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombreEmpresa,
  ]);

  try {
    const ventas = db
      .select({
        idCompra: comprasDetalles.idCompra,
        total:
          sql<number>`SUM(${comprasDetalles.precioVenta} * ${comprasDetalles.cantidad} * ${comprasDetalles.cambioDolar})`.as(
            'total'
          ),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idCompra)
      .as('Ventas');

    const comprasTotal = db
      .select({
        idCompra: comprasDetalles.idCompra,
        total:
          sql<number>`SUM(${comprasDetalles.precioCompra} * ${comprasDetalles.cantidad} * ${comprasDetalles.cambioDolar})`.as(
            'total'
          ),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idCompra)
      .as('ComprasTotal');

    const gastos = db
      .select({
        idCompra: egresos.idCompra,
        total: sql<number>`SUM(${egresos.gasto} * ${egresos.cambioDolar})`.as(
          'total'
        ),
      })
      .from(egresos)
      .groupBy(egresos.idCompra)
      .as('Gastos');

    const data = await db
      .select({
        id: compras.id,
        nombreProveedor: proveedores.nombreEmpresa,
        fecha: compras.fecha,
        total: sql<number>`COALESCE("ComprasTotal"."total", 0)`,
        gastos: sql<number>`COALESCE("Gastos"."total", 0)`,
        ganancia: sql<number>`COALESCE("Ventas"."total", 0) - COALESCE("ComprasTotal"."total", 0)`,
      })
      .from(compras)
      .leftJoin(gastos, eq(compras.id, gastos.idCompra))
      .leftJoin(proveedores, eq(compras.idProveedor, proveedores.id))
      .leftJoin(ventas, eq(compras.id, ventas.idCompra))
      .leftJoin(comprasTotal, eq(compras.id, comprasTotal.idCompra))
      .where(filterBySearch)
      .orderBy(desc(compras.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(compras)
      .leftJoin(gastos, eq(compras.id, gastos.idCompra))
      .leftJoin(proveedores, eq(compras.idProveedor, proveedores.id))
      .leftJoin(ventas, eq(compras.id, ventas.idCompra))
      .leftJoin(comprasTotal, eq(compras.id, comprasTotal.idCompra))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las compras.');
  }
}

export async function getPurchaseById(id: number | string) {
  try {
    const gastos = db
      .select({
        idCompra: egresos.idCompra,
        total: sql<number>`SUM(${egresos.gasto} * ${egresos.cambioDolar})`.as(
          'total'
        ),
      })
      .from(egresos)
      .groupBy(egresos.idCompra)
      .as('Gastos');

    const [purchase] = await db
      .select({
        id: compras.id,
        idProveedor: compras.idProveedor,
        nombreEmpresa: proveedores.nombreEmpresa,
        fecha: compras.fecha,
        gastos: sql<number>`COALESCE(${gastos.total}, 0)`,
      })
      .from(compras)
      .leftJoin(proveedores, eq(compras.idProveedor, proveedores.id))
      .leftJoin(gastos, eq(compras.id, gastos.idCompra))
      .where(eq(compras.id, Number(id)));

    const detail = await db
      .select({
        id: comprasDetalles.id,
        idCompra: comprasDetalles.idCompra,
        idProducto: comprasDetalles.idProducto,
        precioCompra: comprasDetalles.precioCompra,
        cantidad: comprasDetalles.cantidad,
        precioVenta: comprasDetalles.precioVenta,
        cambioDolar: comprasDetalles.cambioDolar,
        nombreProducto: productos.nombre,
      })
      .from(comprasDetalles)
      .leftJoin(productos, eq(comprasDetalles.idProducto, productos.id))
      .where(eq(comprasDetalles.idCompra, Number(id)))
      .orderBy(desc(comprasDetalles.id));

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
        value: sql<string>`CAST(${proveedores.id} AS TEXT)`,
        label: proveedores.nombreEmpresa,
      })
      .from(proveedores)
      .orderBy(asc(proveedores.nombreEmpresa));

    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores.');
  }
}
