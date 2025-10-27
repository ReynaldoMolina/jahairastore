'use server';

import { db } from '@/database/db';
import { configuracion } from '@/database/schema/schema';
import { ServerStatus, SettingsFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { stateUpdateError, stateUpdateSuccess } from './stateMessage';

interface UpdateSettings {
  values: SettingsFormType;
}

export async function updateSettings(
  prevState: ServerStatus,
  data: UpdateSettings
) {
  try {
    const id = 1;
    await db
      .update(configuracion)
      .set(data.values)
      .where(eq(configuracion.id, id));

    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
