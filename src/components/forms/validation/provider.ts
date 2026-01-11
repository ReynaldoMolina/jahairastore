import z from 'zod';

export const providerSchema = z.object({
  nombreEmpresa: z.string().min(1, 'Requerido'),
  imagenUrl: z.string().nullable(),
  telefono: z.string().nullable(),
  direccion: z.string().nullable(),
});
