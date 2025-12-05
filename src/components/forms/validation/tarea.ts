import z from 'zod';

export const tareaSchema = z.object({
  tarea: z.string().min(1, 'Requerido'),
  fecha_entrega: z.string().min(1, 'Requerido'),
  prioridad: z.string().min(1, 'Requerido'),
  completado: z.boolean(),
});
