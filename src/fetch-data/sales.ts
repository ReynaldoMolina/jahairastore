import { db } from '@/database/db';
import {
  clientes,
  configuracion,
  productos,
  ventas,
  ventasDetalles,
} from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { desc, eq, sql, and, gt, asc } from 'drizzle-orm';
import { getUrlParams } from './filter';
import { buildSearchFilter } from './build-by-search';
import { getBusinessInfo } from './settings';

export async function getSales(searchParams: SearchParamsProps) {
  const { query, limit, offset, state } = getUrlParams(searchParams);

  const filterBySearch = buildSearchFilter(searchParams, [
    clientes.nombre,
    clientes.apellido,
  ]);

  const filterByState = state
    ? gt(sql<number>`ROUND(${ventas.saldo}::numeric, 2)::float`, 0.01)
    : undefined;

  try {
    const ventasTotal = db
      .select({
        idVenta: ventasDetalles.idVenta,
        total:
          sql<number>`SUM(${ventasDetalles.precioVenta} * ${ventasDetalles.cantidad} * ${ventasDetalles.cambioDolar})`.as(
            'total'
          ),
      })
      .from(ventasDetalles)
      .groupBy(ventasDetalles.idVenta)
      .as('VentasTotal');

    const compras = db
      .select({
        idVenta: ventasDetalles.idVenta,
        total:
          sql<number>`SUM(${ventasDetalles.precioCompra} * ${ventasDetalles.cantidad} * ${ventasDetalles.cambioDolar})`.as(
            'total'
          ),
      })
      .from(ventasDetalles)
      .groupBy(ventasDetalles.idVenta)
      .as('Compras');

    const data = await db
      .select({
        id: ventas.id,
        nombreCliente: sql<string>`${clientes.nombre} || ' ' || ${clientes.apellido}`,
        imagenUrl: clientes.imagenUrl,
        abono: ventas.abono,
        fecha: ventas.fecha,
        credito: ventas.credito,
        total: sql<number>`COALESCE("VentasTotal"."total", 0)`,
        saldo: sql<number>`COALESCE(${ventas.saldo}, 0)`,
        ganancia: sql<number>`COALESCE("VentasTotal"."total", 0) - COALESCE("Compras"."total", 0)`,
      })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .leftJoin(ventasTotal, eq(ventas.id, ventasTotal.idVenta))
      .leftJoin(compras, eq(ventas.id, compras.idVenta))
      .where(and(filterBySearch, filterByState))
      .orderBy(desc(ventas.id))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .leftJoin(ventasTotal, eq(ventas.id, ventasTotal.idVenta))
      .leftJoin(compras, eq(ventas.id, compras.idVenta))
      .where(and(filterBySearch, filterByState));

    const totalPages = Math.ceil(count / limit) || 1;

    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las ventas.');
  }
}

export async function getSaleById(id: number | string) {
  try {
    const [businessInfo] = await db
      .select({
        nombreEmpresa: configuracion.nombreEmpresa,
        eslogan: configuracion.eslogan,
      })
      .from(configuracion)
      .where(eq(configuracion.id, Number(1)));

    const [sale] = await db
      .select({
        id: ventas.id,
        idCliente: ventas.idCliente,
        nombreCliente: clientes.nombre,
        apellidoCliente: clientes.apellido,
        telefono: clientes.telefono,
        fecha: ventas.fecha,
        abono: ventas.abono,
        credito: ventas.credito,
        saldo: ventas.saldo,
        cambioDolar: ventas.cambioDolar,
      })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .where(eq(ventas.id, Number(id)));

    const detail = await db
      .select({
        id: ventasDetalles.id,
        idProducto: ventasDetalles.idProducto,
        nombre: productos.nombre,
        precioVenta: ventasDetalles.precioVenta,
        precioCompra: ventasDetalles.precioCompra,
        cantidad: ventasDetalles.cantidad,
        cambioDolar: ventasDetalles.cambioDolar,
        idVenta: ventasDetalles.idVenta,
      })
      .from(ventasDetalles)
      .leftJoin(productos, eq(ventasDetalles.idProducto, productos.id))
      .where(eq(ventasDetalles.idVenta, Number(id)))
      .orderBy(desc(ventasDetalles.id));

    return {
      ...businessInfo,
      ...sale,
      detail,
    };
  } catch (error) {
    throw new Error('No se pudo obtener la venta.');
  }
}

export interface ReciboVentaDetalle {
  id: number;
  precioVenta: number;
  cantidad: number;
  nombreProducto: string;
  cambioDolar: number;
}

export interface ReciboVenta {
  id: number;
  idCliente: number;
  fecha: string;
  abono: number;
  credito: boolean;
  saldo: number;
  nombreCliente: string;
  apellidoCliente: string;
}

export async function getSaleReceiptPdf(id: number | string | undefined) {
  if (!id) return;

  try {
    const businessInfo = await getBusinessInfo();

    const [sale]: ReciboVenta[] = await db
      .select({
        id: ventas.id,
        idCliente: ventas.idCliente,
        fecha: ventas.fecha,
        abono: ventas.abono,
        credito: ventas.credito,
        saldo: ventas.saldo,
        nombreCliente: clientes.nombre,
        apellidoCliente: clientes.apellido,
      })
      .from(ventas)
      .leftJoin(clientes, eq(ventas.idCliente, clientes.id))
      .where(eq(ventas.id, Number(id)))
      .groupBy(clientes.id, ventas.id);

    const saledetail: ReciboVentaDetalle[] = await db
      .select({
        id: ventasDetalles.id,
        precioVenta: ventasDetalles.precioVenta,
        cantidad: ventasDetalles.cantidad,
        nombreProducto: productos.nombre,
        cambioDolar: ventasDetalles.cambioDolar,
      })
      .from(ventasDetalles)
      .leftJoin(productos, eq(ventasDetalles.idProducto, productos.id))
      .where(eq(ventasDetalles.idVenta, Number(sale.id)))
      .groupBy(ventasDetalles.id, productos.nombre)
      .orderBy(asc(productos.nombre));

    return {
      ...businessInfo,
      ...sale,
      detail: saledetail,
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}
