import z from 'zod';
import { zNumberMin, zNumber, zNumberNullable } from './zod-helper';

export const saleSchema = z.object({
  idCliente: zNumber(),
  fecha: z.string().min(1, 'Requerido'),
  abono: zNumberNullable(),
  credito: z.boolean(),
  cambioDolar: zNumberMin(),
  saldo: zNumberNullable(),
});
