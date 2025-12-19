import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const productSchema = z.object({
  idProveedor: z.number().nullable(),
  nombre: z.string().min(1, 'Requerido'),
  descripcion: z.string().nullable(),
  precioCompra: zNumberMin(),
  precioVenta: zNumberMin(),
  precioVentaPorMayor: zNumberMinZero(),
  fecha: z.string().nullable(),
  codigo: z.string().nullable(),
  precioEnCordobas: z.boolean(),
  cambioDolar: zNumberMin(),
});
