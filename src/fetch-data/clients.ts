import { db } from '@/database/db';
import { cliente } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilterByClient } from './build-by-search';

export async function getClients(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilterByClient(searchParams);

  try {
    const data = await db
      .select({
        id: cliente.id,
        nombre: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
        imagenUrl: cliente.imagenUrl,
        telefono: cliente.telefono,
      })
      .from(cliente)
      .where(filterBySearch)
      .orderBy(desc(cliente.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(cliente)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    throw new Error('No se pudieron obtener los cliente.');
  }
}

export async function getClientById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(cliente)
      .where(eq(cliente.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el cliente.');
  }
}

export async function getClientsSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${cliente.id} AS TEXT)`,
        label: sql<string>`${cliente.nombre} || ' ' || ${cliente.apellido}`,
      })
      .from(cliente)
      .orderBy(asc(cliente.nombre));

    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los cliente.');
  }
}
