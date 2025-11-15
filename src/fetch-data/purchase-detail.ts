import { comprasDetalles, productos } from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';

export async function getPurchaseDetailById(id: number | string) {
  try {
    const compras = db
      .select({
        idProducto: comprasDetalles.idProducto,
        cantidad: sql<number>`SUM(${comprasDetalles.cantidad})`.as('cantidad'),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idProducto)
      .as('Compras');

    const ventas = db
      .select({
        idProducto: comprasDetalles.idProducto,
        cantidad: sql<number>`SUM(${comprasDetalles.cantidad})`.as('cantidad'),
      })
      .from(comprasDetalles)
      .groupBy(comprasDetalles.idProducto)
      .as('Ventas');

    const [detail] = await db
      .select({
        id: comprasDetalles.id,
        idProducto: comprasDetalles.idProducto,
        nombreProducto: productos.nombre,
        precioEnCordobas: productos.precioEnCordobas,
        precioVenta: comprasDetalles.precioVenta,
        precioCompra: comprasDetalles.precioCompra,
        cantidad: comprasDetalles.cantidad,
        cambioDolar: comprasDetalles.cambioDolar,
        idCompra: comprasDetalles.idCompra,
        existencias: sql<number>`
          (COALESCE("Compras"."cantidad", 0) - COALESCE("Ventas"."cantidad", 0))::integer
        `,
      })
      .from(comprasDetalles)
      .leftJoin(productos, eq(comprasDetalles.idProducto, productos.id))
      .leftJoin(compras, eq(compras.idProducto, comprasDetalles.idProducto))
      .leftJoin(ventas, eq(ventas.idProducto, comprasDetalles.idProducto))
      .where(eq(comprasDetalles.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
