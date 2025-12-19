import z from 'zod';
import { zNumberMin } from './zod-helper';

export const productSchema = z.object({
  idProveedor: z.number().nullable(),
  nombre: z.string().min(1, 'Requerido'),
  descripcion: z.string().nullable(),
  precioCompra: zNumberMin(),
  precioVenta: zNumberMin(),
  fecha: z.string().nullable(),
  idShein: z.string().nullable(),
  precioEnCordobas: z.boolean(),
  cambioDolar: zNumberMin(),
});
