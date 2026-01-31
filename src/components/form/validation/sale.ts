import z from 'zod';
import { zNumberMin, zNumber, zNumberMinZero } from './zod-helper';

export const saleSchema = z.object({
  idCliente: zNumber(),
  fecha: z.string().min(1, 'Requerido'),
  abono: zNumberMinZero(),
  credito: z.boolean(),
  idUbicacion: zNumber(),
});

export const saleDetailSchema = z.object({
  idVenta: zNumberMin(),
  idProducto: zNumberMin(),
  precioVenta: zNumberMin(),
  precioVentaPorMayor: zNumberMinZero(),
  costo: zNumberMinZero(),
  cantidad: zNumberMin(),
  cambioDolar: zNumberMin(),
  precioPorMayor: z.boolean(),
});
