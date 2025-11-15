'use server';

import { db } from '@/database/db';
import { egresos } from '@/database/schema/schema';
import { ExpenseFormType, ServerStatus } from '@/types/types';
import { eq } from 'drizzle-orm';
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from './stateMessage';

interface CreateExpense {
  values: ExpenseFormType;
}

export async function createExpense(
  prevState: ServerStatus,
  data: CreateExpense
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(egresos)
      .values(data.values)
      .returning({ id: egresos.id });

    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateExpense {
  id: number | string;
  values: ExpenseFormType;
}

export async function updateExpense(
  prevState: ServerStatus,
  data: UpdateExpense
) {
  try {
    await db
      .update(egresos)
      .set(data.values)
      .where(eq(egresos.id, Number(data.id)));
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
