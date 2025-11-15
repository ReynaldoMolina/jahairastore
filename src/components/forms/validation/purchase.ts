import z from 'zod';
import { zNumberMin } from './zod-helper';

export const purchaseSchema = z.object({
  idProveedor: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
});

export const purchaseDetailSchema = z.object({
  idCompra: zNumberMin(),
  idProducto: zNumberMin(),
  precioCompra: zNumberMin(),
  cantidad: zNumberMin(),
  precioVenta: zNumberMin(),
  cambioDolar: zNumberMin(),
});
