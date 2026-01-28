import { compra, compraDetalle, producto } from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import { getStock } from './stock';

export async function getPurchaseIdUbicacion(id: number | string) {
  try {
    const [purchase] = await db
      .select({
        idUbicacion: compra.idUbicacion,
      })
      .from(compra)
      .where(eq(compra.id, Number(id)));

    return purchase.idUbicacion;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el id de la ubicacion.');
  }
}

export async function getPurchaseDetailById(
  id: number | string,
  idUbicacion: number | undefined
) {
  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida, ajustes } =
      await getStock(idUbicacion);

    const [detail] = await db
      .select({
        id: compraDetalle.id,
        idProducto: compraDetalle.idProducto,
        nombreProducto: producto.nombre,
        precioEnDolares: producto.precioEnDolares,
        costo: compraDetalle.costo,
        cantidad: compraDetalle.cantidad,
        cambioDolar: compraDetalle.cambioDolar,
        idCompra: compraDetalle.idCompra,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0)
          + COALESCE("ajustes"."cantidad", 0)
          )::float
        `,
      })
      .from(compraDetalle)
      .leftJoin(producto, eq(compraDetalle.idProducto, producto.id))
      .leftJoin(compras, eq(compras.idProducto, compraDetalle.idProducto))
      .leftJoin(ventas, eq(ventas.idProducto, compraDetalle.idProducto))
      .leftJoin(
        trasladosEntrada,
        eq(trasladosEntrada.idProducto, compraDetalle.idProducto)
      )
      .leftJoin(
        trasladosSalida,
        eq(trasladosSalida.idProducto, compraDetalle.idProducto)
      )
      .leftJoin(ajustes, eq(ajustes.idProducto, compraDetalle.idProducto))
      .where(eq(compraDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
