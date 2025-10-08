'use server';

import { db } from '@/database';
import { negocio } from '@/database/schema';
import { NegocioFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { goBackTo } from './actions-utils';

export async function updateNegocio(prevState: unknown, data: NegocioFormType) {
  try {
    const id = 1;
    await db.update(negocio).set(data).where(eq(negocio.id, id));
  } catch (error) {
    return error;
  }
  await goBackTo('/ajustes');
}
