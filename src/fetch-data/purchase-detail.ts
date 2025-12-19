import {
  compraDetalle,
  producto,
  ventaDetalle,
} from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';

export async function getPurchaseDetailById(id: number | string) {
  try {
    const compras = db
      .select({
        idProducto: compraDetalle.idProducto,
        cantidad: sql<number>`SUM(${compraDetalle.cantidad})`.as('cantidad'),
      })
      .from(compraDetalle)
      .groupBy(compraDetalle.idProducto)
      .as('compras');

    const ventas = db
      .select({
        idProducto: ventaDetalle.idProducto,
        cantidad: sql<number>`SUM(${ventaDetalle.cantidad})`.as('cantidad'),
      })
      .from(ventaDetalle)
      .groupBy(ventaDetalle.idProducto)
      .as('ventas');

    const [detail] = await db
      .select({
        id: compraDetalle.id,
        idProducto: compraDetalle.idProducto,
        nombreProducto: producto.nombre,
        precioEnCordobas: producto.precioEnCordobas,
        precioVenta: compraDetalle.precioVenta,
        precioCompra: compraDetalle.precioCompra,
        cantidad: compraDetalle.cantidad,
        cambioDolar: compraDetalle.cambioDolar,
        idCompra: compraDetalle.idCompra,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0))::integer
        `,
      })
      .from(compraDetalle)
      .leftJoin(producto, eq(compraDetalle.idProducto, producto.id))
      .leftJoin(compras, eq(compras.idProducto, compraDetalle.idProducto))
      .leftJoin(ventas, eq(ventas.idProducto, compraDetalle.idProducto))
      .where(eq(compraDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
