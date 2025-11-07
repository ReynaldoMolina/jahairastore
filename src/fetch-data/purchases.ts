import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import {
  compras,
  comprasDetalles,
  egresos,
  proveedores,
} from '@/database/schema/schema';
import { db } from '@/database/db';
import { desc, eq, sql } from 'drizzle-orm';

export async function getPurchases(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombreEmpresa,
  ]);

  try {
    const venta = db
      .select({
        idCompra: comprasDetalles.idCompra,
        total:
          sql<number>`SUM(${comprasDetalles.precioVenta} * ${comprasDetalles.cantidad})`.as(
            'total'
          ),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idCompra)
      .as('Venta');

    const compra = db
      .select({
        idCompra: comprasDetalles.idCompra,
        total:
          sql<number>`SUM(${comprasDetalles.precioCompra} * ${comprasDetalles.cantidad})`.as(
            'total'
          ),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idCompra)
      .as('Compra');

    const gastos = db
      .select({
        idCompra: egresos.idCompra,
        total: sql<number>`SUM(${egresos.gasto})`.as('total'),
      })
      .from(egresos)
      .groupBy(egresos.idCompra)
      .as('Gastos');

    const data = await db
      .select({
        id: compras.id,
        nombreProveedor: proveedores.nombreEmpresa,
        fecha: compras.fecha,
        totalCompra: sql<number>`COALESCE("Compra"."total", 0)`,
        gastos: sql<number>`COALESCE("Gastos"."total", 0)`,
        ganancia: sql<number>`COALESCE("Venta"."total", 0) - COALESCE("Compra"."total", 0) - COALESCE("Gastos"."total", 0)`,
      })
      .from(compras)
      .leftJoin(venta, eq(compras.id, venta.idCompra))
      .leftJoin(compra, eq(compras.id, compra.idCompra))
      .leftJoin(gastos, eq(compras.id, gastos.idCompra))
      .leftJoin(proveedores, eq(compras.idProveedor, proveedores.id))
      .where(filterBySearch)
      .orderBy(desc(compras.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(compras)
      .leftJoin(venta, eq(compras.id, venta.idCompra))
      .leftJoin(compra, eq(compras.id, compra.idCompra))
      .leftJoin(gastos, eq(compras.id, gastos.idCompra))
      .leftJoin(proveedores, eq(compras.idProveedor, proveedores.id))
      .leftJoin(egresos, eq(compras.id, egresos.idCompra))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las compras.');
  }
}
