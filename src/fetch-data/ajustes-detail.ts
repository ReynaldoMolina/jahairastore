import {
  producto,
  productoAjuste,
  productoAjusteDetalle,
} from '@/database/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/database/db';
import { getStock } from './stock';

export async function getAjusteInventarioIdUbicacion(id: number | string) {
  try {
    const [ajuste] = await db
      .select({
        idUbicacion: productoAjuste.idUbicacion,
      })
      .from(productoAjuste)
      .where(eq(productoAjuste.id, Number(id)));

    return ajuste.idUbicacion;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el id de la ubicacion.');
  }
}

export async function getAjusteInventarioDetailById(
  id: number | string,
  idUbicacion: number
) {
  try {
    const { compras, ventas, trasladosEntrada, trasladosSalida, ajustes } =
      await getStock(idUbicacion);

    const [detail] = await db
      .select({
        id: productoAjusteDetalle.id,
        idAjuste: productoAjusteDetalle.idAjuste,
        idProducto: productoAjusteDetalle.idProducto,
        nombreProducto: producto.nombre,
        cantidad: productoAjusteDetalle.cantidad,
        existencias: sql<number>`
          (COALESCE("compras"."cantidad", 0)
          - COALESCE("ventas"."cantidad", 0)
          + COALESCE("traslados_entrada"."cantidad", 0)
          - COALESCE("traslados_salida"."cantidad", 0)
          + COALESCE("ajustes"."cantidad", 0)
          )::float
        `,
      })
      .from(productoAjusteDetalle)
      .leftJoin(producto, eq(productoAjusteDetalle.idProducto, producto.id))
      .leftJoin(
        compras,
        eq(compras.idProducto, productoAjusteDetalle.idProducto)
      )
      .leftJoin(ventas, eq(ventas.idProducto, productoAjusteDetalle.idProducto))
      .leftJoin(
        trasladosEntrada,
        eq(trasladosEntrada.idProducto, productoAjusteDetalle.idProducto)
      )
      .leftJoin(
        trasladosSalida,
        eq(trasladosSalida.idProducto, productoAjusteDetalle.idProducto)
      )
      .leftJoin(
        ajustes,
        eq(ajustes.idProducto, productoAjusteDetalle.idProducto)
      )
      .where(eq(productoAjusteDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
