import {
  compraDetalle,
  producto,
  ventaDetalle,
} from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';

export async function getSaleDetailById(id: number | string) {
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
        id: ventaDetalle.id,
        idVenta: ventaDetalle.idVenta,
        idProducto: ventaDetalle.idProducto,
        nombreProducto: producto.nombre,
        precioEnCordobas: producto.precioEnCordobas,
        precioVenta: ventaDetalle.precioVenta,
        precioVentaPorMayor: ventaDetalle.precioVentaPorMayor,
        precioCompra: ventaDetalle.precioCompra,
        cantidad: ventaDetalle.cantidad,
        cambioDolar: ventaDetalle.cambioDolar,
        precioPorMayor: ventaDetalle.precioPorMayor,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0) - COALESCE("ventas"."cantidad", 0))::integer
        `,
      })
      .from(ventaDetalle)
      .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
      .leftJoin(compras, eq(compras.idProducto, ventaDetalle.idProducto))
      .leftJoin(ventas, eq(ventas.idProducto, ventaDetalle.idProducto))
      .where(eq(ventaDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
