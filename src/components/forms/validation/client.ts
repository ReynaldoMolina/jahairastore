import z from 'zod';
import { zNumberNullable } from './zod-helper';

export const clientSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  telefono: z.preprocess((value) => {
    if (value === '+505 ' || value === '+505') return '';
    return value;
  }, z.string().nullable()) as unknown as z.ZodString,
  municipio: z.string().nullable(),
  departamento: z.string().nullable(),
  pais: z.string().nullable(),
  direccion: z.string().nullable(),
  idUsuario: zNumberNullable(),
});
