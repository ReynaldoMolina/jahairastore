import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilterByPurchase } from './build-by-search';
import { gasto, proveedor } from '@/database/schema/schema';
import { db } from '@/database/db';
import { desc, eq, sql } from 'drizzle-orm';

export async function getExpenses(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByPurchase(searchParams);

  try {
    const data = await db
      .select({
        id: gasto.id,
        idCompra: gasto.idCompra,
        nombreProveedor: proveedor.nombreEmpresa,
        fecha: gasto.fecha,
        gasto: gasto.gasto,
        concepto: gasto.concepto,
        enDolares: gasto.enDolares,
        cambioDolar: gasto.cambioDolar,
        anulado: gasto.anulado,
      })
      .from(gasto)
      .leftJoin(proveedor, eq(gasto.idProveedor, proveedor.id))
      .where(filterBySearch)
      .orderBy(desc(gasto.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(gasto)
      .leftJoin(proveedor, eq(gasto.idProveedor, proveedor.id))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los gastos');
  }
}

export async function getExpenseById(id: number | string) {
  try {
    const [data] = await db
      .select({
        id: gasto.id,
        idCompra: gasto.idCompra,
        idProveedor: gasto.idProveedor,
        nombreEmpresa: proveedor.nombreEmpresa,
        fecha: gasto.fecha,
        gasto: gasto.gasto,
        concepto: gasto.concepto,
        cambioDolar: gasto.cambioDolar,
        enDolares: gasto.enDolares,
        anulado: gasto.anulado,
      })
      .from(gasto)
      .leftJoin(proveedor, eq(gasto.idProveedor, proveedor.id))
      .where(eq(gasto.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el gasto.');
  }
}

export async function getExpenseProviderById(id: number | string) {
  try {
    const [data] = await db
      .select({
        nombreEmpresa: proveedor.nombreEmpresa,
      })
      .from(proveedor)
      .where(eq(proveedor.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor del gasto.');
  }
}
