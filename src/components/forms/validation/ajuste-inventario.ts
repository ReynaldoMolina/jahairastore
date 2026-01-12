import z from 'zod';
import { zNumberMin } from './zod-helper';

export const ajusteInventarioSchema = z.object({
  fecha: z.string().min(1, 'Requerido'),
  idUbicacion: zNumberMin(),
  motivo: z.string().min(1, 'Requerido'),
});

export const ajusteInventarioDetailSchema = z.object({
  idAjuste: zNumberMin(),
  idProducto: zNumberMin(),
  cantidad: zNumberMin(),
});
