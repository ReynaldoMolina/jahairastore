import { clientes } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { count, SQL, eq, asc } from 'drizzle-orm';

export async function getClients(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select()
      .from(clientes)
      .where(filterBySearch)
      .orderBy(asc(clientes.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getClientsPages(filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

async function getClientsPages(
  filterBySearch: SQL<unknown> | undefined,
  limit: number
) {
  try {
    const data = await db
      .select({ count: count() })
      .from(clientes)
      .where(filterBySearch);

    return Math.ceil(Number(data) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}

export async function getClientById(id: number) {
  try {
    const [data] = await db.select().from(clientes).where(eq(clientes.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}
