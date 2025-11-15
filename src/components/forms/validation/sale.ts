import z from 'zod';
import { zNumberMin, zNumber, zNumberMinZero } from './zod-helper';

export const saleSchema = z.object({
  idCliente: zNumber(),
  fecha: z.string().min(1, 'Requerido'),
  abono: zNumberMinZero(),
  credito: z.boolean(),
  cambioDolar: zNumberMin(),
  saldo: zNumberMinZero(),
});

export const saleDetailSchema = z.object({
  idProducto: zNumberMin(),
  precioVenta: zNumberMin(),
  precioCompra: zNumberMin(),
  cantidad: zNumberMin(),
  cambioDolar: zNumberMin(),
  idVenta: zNumberMin(),
});
