import { categorias } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { count, SQL } from 'drizzle-orm';

export async function getCategories(searchParams: SearchParamsProps) {
  const { search, filterBySearch } = buildFilterBySearch(searchParams, [
    categorias.categoria,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select()
      .from(categorias)
      .where(filterBySearch)
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getCategoriesPages(filterBySearch, limit ?? 0);

    return { data, search, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

async function getCategoriesPages(
  filterBySearch: SQL<unknown> | undefined,
  limit: number
) {
  try {
    const data = await db
      .select({ count: count() })
      .from(categorias)
      .where(filterBySearch);

    return Math.ceil(Number(data) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}
