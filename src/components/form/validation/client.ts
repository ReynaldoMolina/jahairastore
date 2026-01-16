import z from 'zod';

export const clientSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  telefono: z.string().nullable(),
  direccion: z.string().nullable(),
});
