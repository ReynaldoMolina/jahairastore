import { SearchParamsProps } from '@/types/types';
import { getUrlParams } from './filter';
import { db } from '@/database/db';
import { clientes, recibos } from '@/database/schema/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-by-search';

export async function getReceipts(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  try {
    const data = await db
      .select({
        id: recibos.id,
        idPedido: recibos.idPedido,
        fecha: recibos.fecha,
        abono: recibos.abono,
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
      })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(filterBySearch)
      .orderBy(desc(recibos.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(recibos)
      .leftJoin(clientes, eq(recibos.idCliente, clientes.id))
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los recibos');
  }
}
