'use server';

import { db } from '@/database/db';
import { ServerStatus, UserSettingsFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { stateUpdateError, stateUpdateSuccess } from './stateMessage';
import { user } from '@/database/schema/auth-schema';

interface UpdateUserSettings {
  id: string;
  values: UserSettingsFormType;
}

export async function updateUserSettings(
  prevState: ServerStatus,
  data: UpdateUserSettings
) {
  try {
    await db.update(user).set(data.values).where(eq(user.id, data.id));

    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
