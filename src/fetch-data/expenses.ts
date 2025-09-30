import { egresos, proveedores } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getExpenses(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    proveedores.nombre_empresa,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: egresos.id,
        id_compra: egresos.id_compra,
        nombre_empresa: proveedores.nombre_empresa,
        fecha: egresos.fecha,
        gasto: egresos.gasto,
        concepto: egresos.concepto,
        cambio_dolar: egresos.cambio_dolar,
      })
      .from(egresos)
      .leftJoin(proveedores, eq(egresos.id_proveedor, proveedores.id))
      .where(filterBySearch)
      .groupBy(proveedores.nombre_empresa, egresos.id)
      .orderBy(asc(egresos.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(egresos, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getExpenseById(id: number) {
  try {
    const [data] = await db.select().from(egresos).where(eq(egresos.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}
