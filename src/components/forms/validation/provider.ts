import z from 'zod';

export const providerSchema = z.object({
  nombreEmpresa: z.string().min(1, 'Requerido'),
  nombreContacto: z.string().nullable(),
  telefono: z.preprocess((value) => {
    if (value === '+505 ' || value === '+505') return '';
    return value;
  }, z.string().nullable()) as unknown as z.ZodString,
  departamento: z.string().nullable(),
  municipio: z.string().nullable(),
  pais: z.string().nullable(),
  direccion: z.string().nullable(),
});
