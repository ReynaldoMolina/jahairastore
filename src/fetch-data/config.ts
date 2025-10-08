import { db } from '@/database';
import { ajustes } from '@/database/schema';
import { ConfigType } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getConfig(id = 1): Promise<ConfigType> {
  const selectFields = {
    id_negocio: ajustes.id_negocio,
    cambio_dolar: ajustes.cambio_dolar,
    envio_aereo: ajustes.envio_aereo,
    envio_mar: ajustes.envio_mar,
  };

  try {
    const [data] = await db
      .select(selectFields)
      .from(ajustes)
      .where(eq(ajustes.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la configuración.');
  }
}

export async function getCambioDolar(id = 1) {
  try {
    const [data] = await db
      .select({
        cambio_dolar: ajustes.cambio_dolar,
      })
      .from(ajustes)
      .where(eq(ajustes.id, id));
    return data.cambio_dolar;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la configuración.');
  }
}
