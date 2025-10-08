import { z } from 'zod';

export const zTelefono = () =>
  z.preprocess(
    (value) => (value === '+505 ' ? null : value),
    z.string().trim().nullable()
  ) as unknown as z.ZodString;
