import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc } from 'drizzle-orm';
import { getPages } from './get-pages';
import { municipio } from '@/database/schema';

export async function getMunicipios(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    municipio.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select()
      .from(municipio)
      .where(filterBySearch)
      .orderBy(municipio.id)
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(municipio, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getMunicipioById(id: number | string | undefined) {
  if (!id) return;

  try {
    const [data] = await db
      .select()
      .from(municipio)
      .where(eq(municipio.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}

export async function getMunicipiosSelect() {
  try {
    const data = await db
      .select({
        value: municipio.nombre,
        label: municipio.nombre,
      })
      .from(municipio)
      .orderBy(asc(municipio.id));
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener las municipio');
  }
}
