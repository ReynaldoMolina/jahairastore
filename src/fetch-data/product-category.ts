import { db } from '@/database/db';
import { productoCategoria } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilterByClient } from './build-by-search';

export async function getProductCategories(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByClient(searchParams);

  try {
    const data = await db
      .select({
        id: productoCategoria.id,
        nombre: productoCategoria.nombre,
      })
      .from(productoCategoria)
      .where(filterBySearch)
      .orderBy(desc(productoCategoria.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(productoCategoria)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    throw new Error('No se pudieron obtener las categorías.');
  }
}

export async function getProductCategoryById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(productoCategoria)
      .where(eq(productoCategoria.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener la categoría.');
  }
}

export async function getProductCategoriesSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${productoCategoria.id} AS TEXT)`,
        label: productoCategoria.nombre,
      })
      .from(productoCategoria)
      .orderBy(asc(productoCategoria.nombre));

    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener las categorías.');
  }
}
