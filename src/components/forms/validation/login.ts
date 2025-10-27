import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Requerido'),
  password: z.string().trim().min(1, 'Requerido'),
});
