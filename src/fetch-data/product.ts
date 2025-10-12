import { producto } from '@/database/schema';
import { buildFilterBySearch } from './build-filter-by-search';
import { buildLimitOffset } from './build-limit-offset';
import { SearchParamsProps } from '@/types/types';
import { db } from '@/database';
import { eq, asc, sql } from 'drizzle-orm';
import { getPages } from './get-pages';

export async function getProducts(searchParams: SearchParamsProps) {
  const { filterBySearch } = buildFilterBySearch(searchParams, [
    producto.nombre,
  ]);

  const { limit, offset } = buildLimitOffset(searchParams);

  try {
    const data = await db
      .select({
        id: producto.id,
        nombre_producto: producto.nombre,
        precio_en_cordobas: producto.precio_en_cordobas,
        precio_venta: sql<number>`
          CASE
            WHEN ${producto.precio_en_cordobas} = true THEN (${producto.precio_venta} * ${producto.cambio_dolar})
            ELSE ${producto.precio_venta}
          END
        `,
        precio_compra: sql<number>`
          CASE
            WHEN ${producto.precio_en_cordobas} = true THEN (${producto.precio_compra} * ${producto.cambio_dolar})
            ELSE ${producto.precio_compra}
          END
        `,
        ganancia: sql<number>`
          CASE
            WHEN ${producto.precio_en_cordobas} = true
              THEN COALESCE(${producto.precio_venta} - ${producto.precio_compra}, 0) * ${producto.cambio_dolar}
            ELSE
              COALESCE(${producto.precio_venta} - ${producto.precio_compra}, 0)
          END
        `,
      })
      .from(producto)
      .where(filterBySearch)
      .orderBy(asc(producto.id))
      .limit(limit ?? 10000)
      .offset(offset ?? 0);

    const totalPages = await getPages(producto, filterBySearch, limit ?? 0);

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
    const [data] = await db.select().from(producto).where(eq(producto.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}

export async function getProductsPurchasesModal() {
  try {
    const data = await db
      .select({
        id: producto.id,
        nombre_producto: producto.nombre,
        precio_compra: sql<number>`
          CASE
            WHEN ${producto.precio_en_cordobas} = true THEN (${producto.precio_compra} * ${producto.cambio_dolar})
            ELSE ${producto.precio_compra}
          END
        `,
        precio_en_cordobas: producto.precio_en_cordobas,
        // disponibles: 0,
      })
      .from(producto)
      .where(eq(producto.inventario, true))
      .orderBy(asc(producto.id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el registro, por favor intenta de nuevo.'
    );
  }
}
