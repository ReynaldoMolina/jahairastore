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
