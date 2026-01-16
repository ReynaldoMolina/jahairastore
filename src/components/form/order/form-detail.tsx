import { useServerActionFeedback } from '@/hooks/use-server-status';
import { stateDefault } from '@/server-actions/stateMessage';
import { OrderById, ServerStatus } from '@/types/types';
import { useState, useTransition } from 'react';
import { OrderDetail } from './order-detail';
import { deleteOrderDetail } from '@/server-actions/order-detail';
import { CreateOrderDetailForm } from './detail/create';

interface FormDetail {
  order: OrderById;
}

export function FormDetail({ order }: FormDetail) {
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ServerStatus | null>(null);

  useServerActionFeedback(actionState, { refresh: true });

  function handleDelete(detailId: number) {
    startTransition(async () => {
      const result = await deleteOrderDetail(stateDefault, { id: detailId });
      setActionState(result);
    });
  }

  return (
    <>
      <CreateOrderDetailForm orderId={order.id} />
      <OrderDetail order={order} handleDelete={handleDelete} />
    </>
  );
}
