import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const receiptSchema = z.object({
  idPedido: zNumberMin(),
  idCliente: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
  abono: zNumberMin(),
  saldo: zNumberMinZero(),
  concepto: z.string().nullable(),
});
