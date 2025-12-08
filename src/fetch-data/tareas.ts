import { db } from '@/database/db';
import { tareas } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { sql, desc, eq, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getTareas(searchParams: SearchParamsProps) {
  const { query, state, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [tareas.tarea]);

  const filterByState = state
    ? sql`"Tareas"."Estado" = 'Pendiente'`
    : undefined;

  try {
    const data = await db
      .select()
      .from(tareas)
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(tareas.id), desc(tareas.prioridad))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tareas)
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las tareas.');
  }
}

export async function getTareaById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(tareas)
      .where(eq(tareas.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener la tarea.');
  }
}
