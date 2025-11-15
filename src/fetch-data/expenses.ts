import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { egresos, proveedores } from '@/database/schema/schema';
import { db } from '@/database/db';
import { desc, eq, sql } from 'drizzle-orm';

export async function getExpenses(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombreEmpresa,
    egresos.concepto,
  ]);

  try {
    const data = await db
      .select({
        id: egresos.id,
        idCompra: egresos.idCompra,
        nombreProveedor: proveedores.nombreEmpresa,
        fecha: egresos.fecha,
        gasto: egresos.gasto,
        concepto: egresos.concepto,
        cambioDolar: egresos.cambioDolar,
      })
      .from(egresos)
      .leftJoin(proveedores, eq(egresos.idProveedor, proveedores.id))
      .where(filterBySearch)
      .orderBy(desc(egresos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(egresos)
      .leftJoin(proveedores, eq(egresos.idProveedor, proveedores.id))
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
        id: egresos.id,
        idCompra: egresos.idCompra,
        idProveedor: egresos.idProveedor,
        nombreEmpresa: proveedores.nombreEmpresa,
        fecha: egresos.fecha,
        gasto: egresos.gasto,
        concepto: egresos.concepto,
        cambioDolar: egresos.cambioDolar,
      })
      .from(egresos)
      .leftJoin(proveedores, eq(egresos.idProveedor, proveedores.id))
      .where(eq(egresos.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el gasto.');
  }
}

export async function getExpenseProviderById(id: number | string) {
  try {
    const [data] = await db
      .select({
        nombreEmpresa: proveedores.nombreEmpresa,
      })
      .from(proveedores)
      .where(eq(proveedores.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor del gasto.');
  }
}
