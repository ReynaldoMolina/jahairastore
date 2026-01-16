import z from 'zod';
import { zNumberMin, zNumberNullable } from './zod-helper';

export const orderSchema = z.object({
  idCliente: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
  peso: zNumberNullable(),
  cambioDolar: zNumberMin(),
  precioLibra: zNumberNullable(),
  tipoEnvio: z.string().min(1, 'Requerido'),
});

export const orderDetailSchema = z.object({
  idPedido: zNumberMin(),
  nombreProducto: z.string().min(1, 'Requerido'),
  precioVenta: zNumberMin(),
  precioCompra: zNumberMin(),
  cantidad: zNumberMin(),
  imagenUrl: z.string().nullable(),
});
