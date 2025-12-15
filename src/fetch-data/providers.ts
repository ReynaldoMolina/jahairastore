import { db } from '@/database/db';
import { SearchParamsProps } from '@/types/types';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { proveedores } from '@/database/schema/schema';

export async function getProveedores(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombreEmpresa,
  ]);

  try {
    const data = await db
      .select({
        id: proveedores.id,
        nombreEmpresa: proveedores.nombreEmpresa,
        imagenUrl: proveedores.imagenUrl,
        telefono: proveedores.telefono,
      })
      .from(proveedores)
      .where(filterBySearch)
      .orderBy(desc(proveedores.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(proveedores)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores.');
  }
}

export async function getProviderById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(proveedores)
      .where(eq(proveedores.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor.');
  }
}

export async function getProveedoresSelect() {
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
