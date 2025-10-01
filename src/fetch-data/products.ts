import { productos } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getProducts(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    productos.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        id_externo: productos.id_externo,
        precio_venta: productos.precio_venta,
        precio_compra: productos.precio_compra,
        ganancia: sql<number>`COALESCE((${productos.precio_venta} - ${productos.precio_compra}), 0)`,
      })
      .from(productos)
      .where(filterBySearch)
      .orderBy(asc(productos.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(productos, filterBySearch, limit ?? 0);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getProductById(id: number) {
  try {
    const [data] = await db
      .select()
      .from(productos)
      .where(eq(productos.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}
