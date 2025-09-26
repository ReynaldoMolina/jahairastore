import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Requerido'),
  password: z.string().min(1, 'Requerido'),
  redirectTo: z.string(),
});

export const settingsSchema = z.object({
  nombre_empresa: z.string().min(1, 'Requerido'),
  eslogan: z.string().min(1, 'Requerido'),
  mensaje: z.string().nullable(),
});
