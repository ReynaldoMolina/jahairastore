import z from 'zod';
import { zNumberMin } from './zod-helper';

export const productSchema = z.object({
  idProveedor: z.number().nullable(),
  nombre: z.string().min(1, 'Requerido'),
  descripcion: z.string().nullable(),
  precioCompra: zNumberMin(),
  precioVenta: zNumberMin(),
  idCategoria: z.number().nullable(),
  fecha: z.string().nullable(),
  idShein: z.string().nullable(),
  inventario: z.boolean(),
  cambioDolar: zNumberMin(),
  precioEnCordobas: z.boolean(),
});
