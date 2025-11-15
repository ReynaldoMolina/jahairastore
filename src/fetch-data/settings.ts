import { db } from '@/database/db';
import { configuracion } from '@/database/schema/schema';
import {
  BusinessInfoType,
  SettingsCambioDolarType,
  SettingsFormType,
} from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getBusinessInfo(
  id: number = 1
): Promise<BusinessInfoType> {
  try {
    const [data] = await db
      .select({
        nombreEmpresa: configuracion.nombreEmpresa,
        eslogan: configuracion.eslogan,
        mensaje: configuracion.mensaje,
      })
      .from(configuracion)
      .where(eq(configuracion.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}

export async function getSettings(id: number = 1): Promise<SettingsFormType> {
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

export async function getSettingsCambioDolar(id: number = 1): Promise<number> {
  try {
    const [data] = await db
      .select({
        cambioDolar: configuracion.cambioDolar,
      })
      .from(configuracion)
      .where(eq(configuracion.id, Number(id)));
    return data.cambioDolar;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el cambio de dólar.');
  }
}

export async function getSettingsEnvioPrices(
  id: number = 1
): Promise<SettingsCambioDolarType> {
  try {
    const [data] = await db
      .select({
        envioMaritimo: configuracion.envioMaritimo,
        envioAereo: configuracion.envioAereo,
      })
      .from(configuracion)
      .where(eq(configuracion.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los precios de envíos.');
  }
}
