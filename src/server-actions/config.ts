'use server';

import { db } from '@/database';
import { eq } from 'drizzle-orm';
import { goBackTo } from './actions-utils';
import { ConfigType } from '@/types/types';
import { ajustes } from '@/database/schema';

export async function updateConfig(prevState: unknown, data: ConfigType) {
  try {
    const id = 1;
    await db.update(ajustes).set(data).where(eq(ajustes.id, id));
  } catch (error) {
    return error;
  }
  await goBackTo('/ajustes');
}
