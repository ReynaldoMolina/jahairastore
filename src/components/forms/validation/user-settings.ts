import { z } from 'zod';

export const userSettingsSchema = z.object({
  menuPosition: z.string().trim().min(1, 'Requerido'),
});
