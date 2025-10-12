'use server';

import { db } from '@/database';
import { eq } from 'drizzle-orm';
import { ConfigType } from '@/types/types';
import { ajustes } from '@/database/schema';
import { stateError, stateSuccess } from './state-messages';
import { revalidatePath } from 'next/cache';

export async function updateConfig(prevState: unknown, data: ConfigType) {
  try {
    const id = 1;
    await db.update(ajustes).set(data).where(eq(ajustes.id, id));
    revalidatePath('/ajustes');
    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
}
