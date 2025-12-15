import z from 'zod';

export const providerSchema = z.object({
  nombreEmpresa: z.string().min(1, 'Requerido'),
  nombreContacto: z.string().nullable(),
  telefono: z.string().nullable(),
  departamento: z.string().nullable(),
  municipio: z.string().nullable(),
  pais: z.string().nullable(),
  direccion: z.string().nullable(),
  imagenUrl: z.string().nullable(),
});
