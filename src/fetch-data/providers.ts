import { db } from '@/database/db';
import { SearchParamsProps } from '@/types/types';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { proveedor } from '@/database/schema/schema';

export async function getProveedores(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedor.nombreEmpresa,
  ]);

  try {
    const data = await db
      .select({
        id: proveedor.id,
        nombreEmpresa: proveedor.nombreEmpresa,
        imagenUrl: proveedor.imagenUrl,
        telefono: proveedor.telefono,
      })
      .from(proveedor)
      .where(filterBySearch)
      .orderBy(desc(proveedor.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(proveedor)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedor.');
  }
}

export async function getProviderById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(proveedor)
      .where(eq(proveedor.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor.');
  }
}

export async function getProveedoresSelect() {
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
