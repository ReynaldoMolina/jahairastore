import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const productSchema = z.object({
  idProveedor: z.number().nullable(),
  nombre: z.string().min(1, 'Requerido'),
  descripcion: z.string().nullable(),
  costo: zNumberMinZero(),
  precioVenta: zNumberMinZero(),
  precioVentaPorMayor: zNumberMinZero(),
  fecha: z.string().nullable(),
  codigo: z.string().nullable(),
  precioEnDolares: z.boolean(),
  cambioDolar: zNumberMin(),
  imagenUrl: z.string().nullable(),
});
