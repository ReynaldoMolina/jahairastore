'use server';

import { db } from '@/database/db';
import { ajustes } from '@/database/schema/schema';
import { ServerStatus, AppSettingsFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { stateUpdateError, stateUpdateSuccess } from './stateMessage';

interface UpdateSettings {
  values: AppSettingsFormType;
}

export async function updateSettings(
  prevState: ServerStatus,
  data: UpdateSettings
) {
  try {
    const id = 1;
    await db.update(ajustes).set(data.values).where(eq(ajustes.id, id));

    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
