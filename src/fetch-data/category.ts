import { categoria } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, sql, asc } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getCategories(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    categoria.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select()
      .from(categoria)
      .where(filterBySearch)
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(categoria, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getCategoryById(id: number | string | undefined) {
  if (!id) return;

  try {
    const [data] = await db
      .select()
      .from(categoria)
      .where(eq(categoria.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}

export async function getCategoriesSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${categoria.id} AS TEXT)`,
        label: categoria.nombre,
      })
      .from(categoria)
      .orderBy(asc(categoria.nombre));
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener las categorias');
  }
}
