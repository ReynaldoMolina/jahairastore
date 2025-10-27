import { db } from '@/database/db';
import { configuracion } from '@/database/schema/schema';
import { SettingsFormType } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getBusinessInfo(
  id: number = 1
): Promise<SettingsFormType> {
  try {
    const [data] = await db
      .select()
      .from(configuracion)
      .where(eq(configuracion.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}
