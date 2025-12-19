import { db } from '@/database/db';
import { tarea } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { sql, desc, eq, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getTareas(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [tarea.tarea]);

  const filterByState = state
    ? sql`"tareas"."estado" = 'Pendiente'`
    : undefined;

  try {
    const data = await db
      .select()
      .from(tarea)
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(tarea.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tarea)
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las tarea.');
  }
}

export async function getTareaById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(tarea)
      .where(eq(tarea.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener la tarea.');
  }
}
