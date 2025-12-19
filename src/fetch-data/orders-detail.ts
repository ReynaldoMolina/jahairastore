import { pedidoDetalle } from '@/database/schema/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/database/db';

export async function getOrderDetailById(id: number | string) {
  try {
    const [detail] = await db
      .select()
      .from(pedidoDetalle)
      .where(eq(pedidoDetalle.id, Number(id)));

    return detail;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle.');
  }
}
