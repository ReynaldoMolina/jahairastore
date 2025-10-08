import { proveedor } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getProviders(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    proveedor.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: proveedor.id,
        nombre: proveedor.nombre,
        telefono: proveedor.telefono,
      })
      .from(proveedor)
      .where(filterBySearch)
      .orderBy(asc(proveedor.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(proveedor, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getProviderById(id: number | string | undefined) {
  if (!id) return;

  try {
    const [data] = await db
      .select()
      .from(proveedor)
      .where(eq(proveedor.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}

export async function getProvidersSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${proveedor.id} AS TEXT)`,
        label: proveedor.nombre,
      })
      .from(proveedor)
      .orderBy(asc(proveedor.nombre));
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedor');
  }
}
