import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Requerido'),
  password: z.string().min(1, 'Requerido'),
  redirectTo: z.string(),
});

export const settingsSchema = z.object({
  nombre_empresa: z.string().trim().min(1, 'Requerido'),
  eslogan: z.string().trim().min(1, 'Requerido'),
  mensaje: z.string().trim().nullable(),
});

export const categorySchema = z.object({
  categoria: z.string().min(1, 'Requerido'),
});

export const clientSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  telefono: z.string().nullable(),
  municipio: z.string().min(1, 'Requerido'),
  direccion: z.string().nullable(),
});

export const providerSchema = z.object({
  nombre_empresa: z.string().min(1, 'Requerido'),
  nombre_contacto: z.string().nullable(),
  telefono: z.string().nullable(),
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
