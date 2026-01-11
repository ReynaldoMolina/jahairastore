import z from 'zod';

export const providerSchema = z.object({
  nombreEmpresa: z.string().min(1, 'Requerido'),
  telefono: z.string().nullable(),
  direccion: z.string().nullable(),
});
