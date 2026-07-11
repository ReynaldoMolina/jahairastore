'use server';

import { db } from '@/database/db';
import { ajustes, compraDetalle, producto } from '@/database/schema/schema';
import { PurchaseImport, ServerStatus } from '@/types/types';
import { inArray } from 'drizzle-orm';
import * as XLSX from 'xlsx';

export interface Resultado {
  idProducto: number | null;
  codigo: string;
  cantidad_compra: number;
  cantidad_real: number;
  nombre: string;
  iva: number;
  costo: number;
  total: number;
  costo_real: number;
  existente: boolean;
  venta: number;
  venta_por_mayor: number;
  categoria: number;
}

export async function checkExistingProducts(
  prevState: ServerStatus,
  file: File
) {
  try {
    const bytes = await file.arrayBuffer();
    const workbook = XLSX.read(bytes, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<PurchaseImport>(sheet);

    const codigos = [...new Set(rows.map((r) => String(r.codigo)))];

    const existentesDb = await db
      .select({
        id: producto.id,
        codigo: producto.codigo,
      })
      .from(producto)
      .where(inArray(producto.codigo, codigos));

    const productosMap = new Map(
      existentesDb.map((p) => [String(p.codigo), p])
    );

    const resultado: Resultado[] = rows.map((row) => {
      const subtotal = row.costo * row.cantidad_compra;
      const iva = subtotal * row.iva;
      const cant = row.cantidad_real || row.cantidad_compra;

      const existente = productosMap.get(String(row.codigo));

      return {
        ...row,
        total: subtotal + iva,
        costo_real: (subtotal + iva) / cant,
        existente: !!existente,
        idProducto: existente?.id ?? null,
        venta: 0,
        venta_por_mayor: 0,
        categoria: 1,
      };
    });

    return resultado;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function importProducts(idCompra: number, file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const workbook = XLSX.read(bytes, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const resultado = XLSX.utils.sheet_to_json<Resultado>(sheet);

    const codigos = resultado.map((p) => String(p.codigo));

    /*
      Buscar productos existentes por si el Excel
      no trae correctamente los IDs
    */
    const existentesDb = await db
      .select({
        id: producto.id,
        codigo: producto.codigo,
      })
      .from(producto)
      .where(inArray(producto.codigo, codigos));

    const productosMap = new Map(
      existentesDb.map((p) => [String(p.codigo), p.id])
    );

    /*
      Productos que todavía no existen
    */
    const nuevos = resultado.filter((p) => !p.existente);

    /*
      Crear productos nuevos
    */
    let productosCreados: {
      id: number;
      codigo: string | null;
    }[] = [];

    if (nuevos.length > 0) {
      productosCreados = await db
        .insert(producto)
        .values(
          nuevos.map((p) => ({
            nombre: p.nombre,
            codigo: p.codigo,
            costo: p.costo,
            precioVenta: p.venta,
            precioVentaPorMayor: p.venta_por_mayor || null,
            idCategoria: p.categoria,
          }))
        )
        .returning({
          id: producto.id,
          codigo: producto.codigo,
        });
    }

    /*
      Agregar los IDs de los productos recién creados
    */
    const productosNuevosMap = new Map(
      productosCreados.map((p) => [String(p.codigo), p.id])
    );

    const resultadoFinal: Resultado[] = resultado.map((p) => ({
      ...p,
      idProducto:
        p.idProducto ??
        productosMap.get(String(p.codigo)) ??
        productosNuevosMap.get(String(p.codigo)) ??
        null,
      existente: true,
    }));

    /*
      Crear detalle de compra
    */
    await createPurchaseDetails(idCompra, resultadoFinal);

    return {
      success: true,
      cantidad: resultadoFinal.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPurchaseDetails(
  idCompra: number,
  resultado: Resultado[]
) {
  try {
    const ajuste = await db
      .select({
        cambioDolar: ajustes.cambioDolar,
      })
      .from(ajustes)
      .limit(1);

    const cambioDolar = ajuste[0]?.cambioDolar ?? 1;

    const detalles = resultado.map((p) => {
      if (!p.idProducto) {
        throw new Error(`Producto sin ID: ${p.codigo}`);
      }

      return {
        idCompra,
        idProducto: p.idProducto,
        costo: p.costo_real,
        cantidad: p.cantidad_real || p.cantidad_compra,
        cambioDolar,
      };
    });

    await db.insert(compraDetalle).values(detalles);

    return {
      success: true,
      cantidad: detalles.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
