import { proveedores } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getProviders(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    proveedores.nombre_empresa,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select()
      .from(proveedores)
      .where(filterBySearch)
      .orderBy(asc(proveedores.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(proveedores, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getProviderById(id: number) {
  try {
    const [data] = await db
      .select()
      .from(proveedores)
      .where(eq(proveedores.id, id));
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
        value: sql<string>`CAST(${proveedores.id} AS TEXT)`,
        label: proveedores.nombre_empresa,
      })
      .from(proveedores)
      .orderBy(asc(proveedores.nombre_empresa));
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores');
  }
}
