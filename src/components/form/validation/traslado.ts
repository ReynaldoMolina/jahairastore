import z from 'zod';
import { zNumberMin } from './zod-helper';

export const trasladoSchema = z.object({
  fecha: z.string().min(1, 'Requerido'),
  idUbicacionOrigen: zNumberMin(),
  idUbicacionDestino: zNumberMin(),
});

export const trasladoDetailSchema = z.object({
  idTraslado: zNumberMin(),
  idProducto: zNumberMin(),
  cantidad: zNumberMin(),
});
