import {
  producto,
  productoTraslado,
  productoTrasladoDetalle,
} from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import { getStock } from './stock';

export async function getTrasladoIdUbicacion(id: number | string) {
  try {
    const [traslado] = await db
      .select({
        idUbicacion: productoTraslado.idUbicacionOrigen,
      })
      .from(productoTraslado)
      .where(eq(productoTraslado.id, Number(id)));

    return traslado.idUbicacion;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el id de la ubicacion.');
  }
}

export async function getTrasladoDetailById(
  id: number | string,
  idUbicacion: number
) {
  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida, ajustes } =
      await getStock(idUbicacion);

    const [detail] = await db
      .select({
        id: productoTrasladoDetalle.id,
        idTraslado: productoTrasladoDetalle.idTraslado,
        idProducto: productoTrasladoDetalle.idProducto,
        nombreProducto: producto.nombre,
        cantidad: productoTrasladoDetalle.cantidad,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0)
          + COALESCE("ajustes"."cantidad", 0)
          )::float
        `,
      })
      .from(productoTrasladoDetalle)
      .leftJoin(producto, eq(productoTrasladoDetalle.idProducto, producto.id))
      .leftJoin(
        compras,
        eq(compras.idProducto, productoTrasladoDetalle.idProducto)
      )
      .leftJoin(
        ventas,
        eq(ventas.idProducto, productoTrasladoDetalle.idProducto)
      )
      .leftJoin(
        trasladosEntrada,
        eq(trasladosEntrada.idProducto, productoTrasladoDetalle.idProducto)
      )
      .leftJoin(
        trasladosSalida,
        eq(trasladosSalida.idProducto, productoTrasladoDetalle.idProducto)
      )
      .leftJoin(ajustes, eq(ajustes.idProducto, producto.id))
      .where(eq(productoTrasladoDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
