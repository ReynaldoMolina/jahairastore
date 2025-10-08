'use server';

import { MunicipioType } from '@/types/types';
import { goBackTo } from './actions-utils';
import { db } from '@/database';
import { municipio } from '@/database/schema';
import { eq } from 'drizzle-orm';

interface CreateMunicipio {
  values: MunicipioType;
}

export async function createMunicipio(
  prevState: unknown,
  data: CreateMunicipio
) {
  try {
    await db.insert(municipio).values(data.values);
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/municipios');
}

interface UpdateMunicipio {
  id: number | string | undefined;
  values: MunicipioType;
}

export async function updateMunicipio(
  prevState: unknown,
  data: UpdateMunicipio
) {
  if (!data.id) return;

  try {
    await db
      .update(municipio)
      .set(data.values)
      .where(eq(municipio.id, Number(data.id)));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/municipios');
}
