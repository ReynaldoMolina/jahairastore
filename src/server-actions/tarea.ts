'use server';

import { db } from '@/database/db';
import { tareas } from '@/database/schema/schema';
import { ServerStatus, TareaById } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateTarea {
  values: TareaById;
}

export async function createTarea(prevState: ServerStatus, data: CreateTarea) {
  try {
    await db.insert(tareas).values(data.values);

    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateTarea {
  id: number | string;
  values: TareaById;
}

export async function updateTarea(prevState: ServerStatus, data: UpdateTarea) {
  try {
    await db
      .update(tareas)
      .set(data.values)
      .where(eq(tareas.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
