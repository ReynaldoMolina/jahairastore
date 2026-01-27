import z from 'zod';
import { zNumber, zNumberMin } from './zod-helper';

export const purchaseSchema = z.object({
  idProveedor: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
  idUbicacion: zNumber(),
});

export const purchaseDetailSchema = z.object({
  idCompra: zNumberMin(),
  idProducto: zNumberMin(),
  costo: zNumberMin(),
  cantidad: zNumberMin(),
  cambioDolar: zNumberMin(),
});
