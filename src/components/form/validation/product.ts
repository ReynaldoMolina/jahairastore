import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const productSchema = z.object({
  idProveedor: z.number().nullable(),
  nombre: z.string().min(1, 'Requerido'),
  costo: zNumberMinZero(),
  precioVenta: zNumberMinZero(),
  precioVentaPorMayor: zNumberMinZero(),
  codigo: z.string().nullable(),
  precioEnDolares: z.boolean(),
  cambioDolar: zNumberMin(),
  imagenUrl: z.string().nullable(),
  idCategoria: zNumberMin(),
});
