import { z } from 'zod';

export const zNumber = () =>
  z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number({ invalid_type_error: 'Debe ser un número' })
  ) as unknown as z.ZodNumber;

export const zNumberMin = () =>
  z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z
      .number({ invalid_type_error: 'Debe ser un número' })
      .min(0.01, 'Requerido')
  ) as unknown as z.ZodNumber;

export const zNumberNullable = () =>
  z.preprocess(
    (value) => (value === '' || value === undefined ? null : Number(value)),
    z.number({ invalid_type_error: 'Debe ser un número' }).nullable()
  ) as unknown as z.ZodNumber;
