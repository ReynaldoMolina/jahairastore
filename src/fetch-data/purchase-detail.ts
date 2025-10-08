import { compras_detalles, productos } from '@/database/schema';
import { db } from '@/database';
import { eq } from 'drizzle-orm';

export async function getPurchaseDetailsById(id: number | undefined) {
  if (!id) return [];
  try {
    const data = await db
      .select({
        id: compras_detalles.id,
        id_compra: compras_detalles.id_compra,
        nombre_producto: productos.nombre_producto,
      })
      .from(compras_detalles)
      .leftJoin(productos, eq(compras_detalles.id_producto, productos.id))
      .groupBy(compras_detalles.id, productos.nombre_producto);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener el detalle de la compra, por favor intenta de nuevo.'
    );
  }
}
