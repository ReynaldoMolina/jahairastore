import z from 'zod';
import { zNumberMin, zNumberMinZero } from './zod-helper';

export const expenseSchema = z.object({
  idCompra: zNumberMin(),
  idProveedor: zNumberMin(),
  fecha: z.string().min(1, 'Requerido'),
  gasto: zNumberMinZero(),
  concepto: z.string().nullable(),
  cambioDolar: zNumberMin(),
  enCordobas: z.boolean(),
  anulado: z.boolean(),
});
