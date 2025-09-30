import { db } from '@/database';
import { count, SQL } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export async function getPages(
  tableName: AnyPgTable,
  filterBySearch: SQL<unknown> | undefined,
  limit: number
) {
  try {
    const data = await db
      .select({ count: count() })
      .from(tableName)
      .where(filterBySearch);

    return Math.ceil(Number(data) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}
