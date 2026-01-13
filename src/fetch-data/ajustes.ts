import { db } from '@/database/db';
import {
  producto,
  productoAjuste,
  productoAjusteDetalle,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, asc, eq, sql, and } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getAjustesInventario(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [productoAjuste.id]);

  try {
    const data = await db
      .select()
      .from(productoAjuste)
      .where(and(filterBySearch))
      .orderBy(asc(productoAjuste.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productoAjuste)
      .where(and(filterBySearch));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los ajustes de inventario');
  }
}

export async function getAjusteInventarioById(id: number | string) {
  try {
    const [ajuste] = await db
      .select()
      .from(productoAjuste)
      .where(eq(productoAjuste.id, Number(id)));

    const detail = await db
      .select({
        id: productoAjusteDetalle.id,
        idAjuste: productoAjusteDetalle.idAjuste,
        idProducto: productoAjusteDetalle.idProducto,
        nombre: producto.nombre,
        cantidad: productoAjusteDetalle.cantidad,
      })
      .from(productoAjusteDetalle)
      .leftJoin(producto, eq(productoAjusteDetalle.idProducto, producto.id))
      .where(eq(productoAjusteDetalle.idAjuste, Number(id)))
      .orderBy(desc(productoAjusteDetalle.id));

    return {
      ...ajuste,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener el ajuste de inventario.');
  }
}
