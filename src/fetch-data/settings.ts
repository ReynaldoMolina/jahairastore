import { db } from '@/database/db';
import { ajustes } from '@/database/schema/schema';
import {
  BusinessInfoType,
  SettingsCambioDolarType,
  AppSettingsFormType,
} from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getBusinessName(
  id: number = 1
): Promise<BusinessInfoType> {
  try {
    const [data] = await db
      .select({
        nombreEmpresa: ajustes.nombreEmpresa,
      })
      .from(ajustes)
      .where(eq(ajustes.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}

export async function getBusinessInfo(
  id: number = 1
): Promise<BusinessInfoType> {
  try {
    const [data] = await db
      .select({
        nombreEmpresa: ajustes.nombreEmpresa,
        eslogan: ajustes.eslogan,
      })
      .from(ajustes)
      .where(eq(ajustes.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}

export async function getSettings(
  id: number = 1
): Promise<AppSettingsFormType> {
  try {
    const [data] = await db
      .select()
      .from(ajustes)
      .where(eq(ajustes.id, Number(id)));
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
        cambioDolar: ajustes.cambioDolar,
      })
      .from(ajustes)
      .where(eq(ajustes.id, Number(id)));
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
        envioMaritimo: ajustes.envioMaritimo,
        envioAereo: ajustes.envioAereo,
      })
      .from(ajustes)
      .where(eq(ajustes.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los precios de envíos.');
  }
}
