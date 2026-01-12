import { db } from '@/database/db';
import {
  producto,
  productoTraslado,
  productoTrasladoDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, asc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { getStock } from './stock';

export async function getTraslados(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [productoTraslado.id]);

  try {
    const data = await db
      .select()
      .from(productoTraslado)
      .where(and(filterBySearch))
      .orderBy(asc(productoTraslado.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productoTraslado)
      .where(and(filterBySearch));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los traslados');
  }
}

export async function getTrasladoById(id: number | string) {
  try {
    const [traslado] = await db
      .select()
      .from(productoTraslado)
      .where(eq(productoTraslado.id, Number(id)));

    const detail = await db
      .select({
        id: productoTrasladoDetalle.id,
        idTraslado: productoTrasladoDetalle.idTraslado,
        idProducto: productoTrasladoDetalle.idProducto,
        nombre: producto.nombre,
        cantidad: productoTrasladoDetalle.cantidad,
      })
      .from(productoTrasladoDetalle)
      .leftJoin(producto, eq(productoTrasladoDetalle.idProducto, producto.id))
      .where(eq(productoTrasladoDetalle.idTraslado, Number(id)))
      .orderBy(desc(productoTrasladoDetalle.id));

    return {
      ...traslado,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener el traslado.');
  }
}
