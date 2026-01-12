import { producto, venta, ventaDetalle } from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import { getStock } from './stock';

export async function getSaleIdUbicacion(id: number | string) {
  try {
    const [sale] = await db
      .select({
        idUbicacion: venta.idUbicacion,
      })
      .from(venta)
      .where(eq(venta.id, Number(id)));

    return sale.idUbicacion;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el id de la ubicacion.');
  }
}

export async function getSaleDetailById(
  id: number | string,
  idUbicacion: number
) {
  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida } =
      await getStock(idUbicacion);

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
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0))::float
        `,
      })
      .from(ventaDetalle)
      .leftJoin(producto, eq(ventaDetalle.idProducto, producto.id))
      .leftJoin(compras, eq(compras.idProducto, ventaDetalle.idProducto))
      .leftJoin(ventas, eq(ventas.idProducto, ventaDetalle.idProducto))
      .leftJoin(
        trasladosEntrada,
        eq(trasladosEntrada.idProducto, ventaDetalle.idProducto)
      )
      .leftJoin(
        trasladosSalida,
        eq(trasladosSalida.idProducto, ventaDetalle.idProducto)
      )
      .where(eq(ventaDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
