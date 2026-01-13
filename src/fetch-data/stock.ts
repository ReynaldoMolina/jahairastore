import { db } from '@/database/db';
import {
  compraDetalle,
  compra,
  ventaDetalle,
  venta,
  productoTraslado,
  productoTrasladoDetalle,
  productoAjusteDetalle,
  productoAjuste,
} from '@/database/schema/schema';
import { sql, eq } from 'drizzle-orm';

export async function getStock(ubicacion: number | undefined) {
  const comprasBase = db
    .select({
      idProducto: compraDetalle.idProducto,
      id_ubicacion: ubicacion ? compra.idUbicacion : sql<number | null>`NULL`,
      cantidad: sql<number>`SUM(${compraDetalle.cantidad})`.as('cantidad'),
    })
    .from(compraDetalle)
    .innerJoin(compra, eq(compraDetalle.idCompra, compra.id))
    .where(ubicacion ? eq(compra.idUbicacion, ubicacion) : undefined);

  const compras = (
    ubicacion
      ? comprasBase.groupBy(compraDetalle.idProducto, compra.idUbicacion)
      : comprasBase.groupBy(compraDetalle.idProducto)
  ).as('compras');

  const ventasBase = db
    .select({
      idProducto: ventaDetalle.idProducto,
      id_ubicacion: ubicacion ? venta.idUbicacion : sql<number | null>`NULL`,
      cantidad: sql<number>`SUM(${ventaDetalle.cantidad})`.as('cantidad'),
    })
    .from(ventaDetalle)
    .innerJoin(venta, eq(ventaDetalle.idVenta, venta.id))
    .where(ubicacion ? eq(venta.idUbicacion, ubicacion) : undefined);

  const ventas = (
    ubicacion
      ? ventasBase.groupBy(ventaDetalle.idProducto, venta.idUbicacion)
      : ventasBase.groupBy(ventaDetalle.idProducto)
  ).as('ventas');

  const trasladosEntradaBase = db
    .select({
      idProducto: productoTrasladoDetalle.idProducto,
      id_ubicacion: ubicacion
        ? productoTraslado.idUbicacionDestino
        : sql<number | null>`NULL`,
      cantidad: sql<number>`SUM(${productoTrasladoDetalle.cantidad})`.as(
        'cantidad'
      ),
    })
    .from(productoTrasladoDetalle)
    .innerJoin(
      productoTraslado,
      eq(productoTrasladoDetalle.idTraslado, productoTraslado.id)
    )
    .where(
      ubicacion ? eq(productoTraslado.idUbicacionDestino, ubicacion) : undefined
    );

  const trasladosEntrada = (
    ubicacion
      ? trasladosEntradaBase.groupBy(
          productoTrasladoDetalle.idProducto,
          productoTraslado.idUbicacionDestino
        )
      : trasladosEntradaBase.groupBy(productoTrasladoDetalle.idProducto)
  ).as('traslados_entrada');

  const trasladosSalidaBase = db
    .select({
      idProducto: productoTrasladoDetalle.idProducto,
      id_ubicacion: ubicacion
        ? productoTraslado.idUbicacionOrigen
        : sql<number | null>`NULL`,
      cantidad: sql<number>`SUM(${productoTrasladoDetalle.cantidad})`.as(
        'cantidad'
      ),
    })
    .from(productoTrasladoDetalle)
    .innerJoin(
      productoTraslado,
      eq(productoTrasladoDetalle.idTraslado, productoTraslado.id)
    )
    .where(
      ubicacion ? eq(productoTraslado.idUbicacionOrigen, ubicacion) : undefined
    );

  const trasladosSalida = (
    ubicacion
      ? trasladosSalidaBase.groupBy(
          productoTrasladoDetalle.idProducto,
          productoTraslado.idUbicacionOrigen
        )
      : trasladosSalidaBase.groupBy(productoTrasladoDetalle.idProducto)
  ).as('traslados_salida');

  const ajustesBase = db
    .select({
      idProducto: productoAjusteDetalle.idProducto,
      id_ubicacion: ubicacion
        ? productoAjuste.idUbicacion
        : sql<number | null>`NULL`,
      cantidad: sql<number>`SUM(${productoAjusteDetalle.cantidad})`.as(
        'cantidad'
      ),
    })
    .from(productoAjusteDetalle)
    .innerJoin(
      productoAjuste,
      eq(productoAjusteDetalle.idAjuste, productoAjuste.id)
    )
    .where(ubicacion ? eq(productoAjuste.idUbicacion, ubicacion) : undefined);

  const ajustes = (
    ubicacion
      ? ajustesBase.groupBy(
          productoAjusteDetalle.idProducto,
          productoAjuste.idUbicacion
        )
      : ajustesBase.groupBy(productoAjusteDetalle.idProducto)
  ).as('ajustes');

  return { compras, ventas, trasladosEntrada, trasladosSalida, ajustes };
}
