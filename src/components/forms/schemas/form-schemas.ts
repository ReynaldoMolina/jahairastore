import {z} from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Requerido'),
  password: z.string().min(1, 'Requerido'),
  redirectTo: z.string()
})