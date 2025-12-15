import z from 'zod';
import { zNumberNullable } from './zod-helper';

export const clientSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  telefono: z.string().nullable(),
  municipio: z.string().nullable(),
  departamento: z.string().nullable(),
  pais: z.string().nullable(),
  direccion: z.string().nullable(),
  idUsuario: zNumberNullable(),
  imagenUrl: z.string().nullable(),
});
