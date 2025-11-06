import { db } from '@/database/db';
import { clientes } from '@/database/schema/schema';
import { sql, asc } from 'drizzle-orm';

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
