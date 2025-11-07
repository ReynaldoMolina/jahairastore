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
