import z from 'zod';

export const categorySchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
});
