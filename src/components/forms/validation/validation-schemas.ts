import { z } from 'zod';
import { zTelefono } from './zod-helper';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Requerido'),
  password: z.string().min(1, 'Requerido'),
  redirectTo: z.string(),
});

export const negocioSchema = z.object({
  nombre: z.string().trim().min(1, 'Requerido'),
  eslogan: z.string().trim().min(1, 'Requerido'),
  mensaje: z.string().trim().nullable(),
});

export const configSchema = z.object({
  id_negocio: z.coerce.number().min(0, 'Requerido'),
  cambio_dolar: z.coerce.number().min(0, 'Requerido'),
  envio_aereo: z.coerce.number().min(0, 'Requerido'),
  envio_mar: z.coerce.number().min(0, 'Requerido'),
});

export const categorySchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
});

export const municipioSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
});

export const clientSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  telefono: zTelefono(),
  municipio: z.string().min(1, 'Requerido'),
  direccion: z.string().nullable(),
});

export const providerSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  telefono: zTelefono(),
  municipio: z.string().min(1, 'Requerido'),
  direccion: z.string().nullable(),
});

export const expenseSchema = z.object({
  id_compra: z.number().min(1, 'Requerido'),
  id_proveedor: z.number().min(1, 'Requerido'),
  fecha: z.string().min(1, 'Requerido'),
  gasto: z.number().min(0.01, 'Requerido'),
  concepto: z.string().nullable(),
  cambio_dolar: z.number().min(1, 'Requerido'),
});

export const purchaseSchema = z.object({
  id_proveedor: z.number().min(1, 'Requerido'),
  fecha: z.string().min(1, 'Requerido'),
});

export const productSchema = z.object({
  id_proveedor: z.number().min(1, 'Requerido'),
  nombre_producto: z.string().min(1, 'Requerido'),
  precio_compra: z.coerce.number().min(0, 'Requerido'),
  precio_venta: z.coerce.number().min(0, 'Requerido'),
  cambio_dolar: z.coerce.number().min(0, 'Requerido'),
  id_categoria: z.number().min(1, 'Requerido'),
  fecha: z.string().min(1, 'Requerido'),
  id_externo: z.string().nullable(),
  inventario: z.boolean(),
  precio_en_cordobas: z.boolean(),
});
