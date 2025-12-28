import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const receiptSchema = z.object({
  idPedido: zNumberMin(),
  idCliente: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
  abono: zNumberMinZero(),
  saldo: zNumberMinZero(),
  cambioDolar: zNumberMin(),
  enCordobas: z.boolean(),
  concepto: z.string().nullable(),
  anulado: z.boolean(),
});
