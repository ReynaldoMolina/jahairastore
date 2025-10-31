import { db } from '@/database/db';
import { productos } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';

export async function getProducts(searchParams: SearchParamsProps) {
  const { query, limit, offset } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [productos.nombre]);

  try {
    const data = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        idShein: productos.idShein,
        precioCompra: productos.precioCompra,
        precioVenta: productos.precioVenta,
        ganancia: productos.precioVenta,
      })
      .from(productos)
      .where(filterBySearch)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(productos.id));

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productos)
      .where(filterBySearch);

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProductById(id: number | string) {
  try {
    const [data] = await db
      .select()
      .from(productos)
      .where(eq(productos.id, Number(id)));
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el producto.');
  }
}
