import { z } from 'zod';

export const settingsSchema = z.object({
  nombreEmpresa: z.string().trim().min(1, 'Requerido'),
  eslogan: z.string().trim().min(1, 'Requerido'),
  mensaje: z.string().trim().nullable(),
});
