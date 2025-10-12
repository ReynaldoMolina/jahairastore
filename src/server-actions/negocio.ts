'use server';

import { db } from '@/database';
import { negocio } from '@/database/schema';
import { NegocioFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { stateError, stateSuccess } from './state-messages';
import { revalidatePath } from 'next/cache';

export async function updateNegocio(prevState: unknown, data: NegocioFormType) {
  try {
    const id = 1;
    await db.update(negocio).set(data).where(eq(negocio.id, id));
    revalidatePath('/ajustes/info');
    return stateSuccess;
  } catch (error) {
    console.error(error);
    return stateError;
  }
}
