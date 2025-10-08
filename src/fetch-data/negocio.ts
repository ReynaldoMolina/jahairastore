import { db } from '@/database';
import { negocio } from '@/database/schema';
import { NegocioFormType } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getNegocio(id = 1): Promise<NegocioFormType> {
  const selectFields = {
    nombre: negocio.nombre ?? '',
    eslogan: negocio.eslogan ?? '',
    mensaje: negocio.mensaje ?? '',
  };

  try {
    const [data] = await db
      .select(selectFields)
      .from(negocio)
      .where(eq(negocio.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}
