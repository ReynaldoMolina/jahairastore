import { z } from 'zod';
import { zNumberMin } from './zod-helper';

export const appSettingsSchema = z.object({
  nombreEmpresa: z.string().trim().min(1, 'Requerido'),
  eslogan: z.string().trim().min(1, 'Requerido'),
  mensaje: z.string().trim().nullable(),
  porHacer: z.string().trim().nullable(),
  cambioDolar: zNumberMin(),
  envioMaritimo: zNumberMin(),
  envioAereo: zNumberMin(),
});
