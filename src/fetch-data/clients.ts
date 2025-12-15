import { db } from '@/database/db';
import { clientes } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getClients(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  try {
    const data = await db
      .select({
        id: clientes.id,
        nombre: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
        imagenUrl: clientes.imagenUrl,
        telefono: clientes.telefono,
      })
      .from(clientes)
      .where(filterBySearch)
      .orderBy(desc(clientes.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(clientes)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes.');
  }
}

export async function getClientById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(clientes)
      .where(eq(clientes.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el cliente.');
  }
}

export async function getClientsSelect() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${clientes.id} AS TEXT)`,
        label: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
      })
      .from(clientes)
      .orderBy(asc(clientes.nombre));

    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes.');
  }
}
