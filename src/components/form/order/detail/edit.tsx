'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { OrderDetailType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { orderDetailSchema } from '../../validation/order';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OrderDetailForm } from './form';
import { updateOrderDetail } from '@/server-actions/order-detail';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

interface EditOrderDetailDialog {
  detail: OrderDetailType;
}

export function EditOrderDetailDialog({ detail }: EditOrderDetailDialog) {
  const form = useForm<z.infer<typeof orderDetailSchema>>({
    resolver: zodResolver(orderDetailSchema),
    defaultValues: {
      idPedido: detail.idPedido,
      nombreProducto: detail.nombreProducto,
      precioVenta: detail.precioVenta,
      costo: detail.costo,
      cantidad: detail.cantidad,
      imagenUrl: detail.imagenUrl,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateOrderDetail,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof orderDetailSchema>) {
    startTransition(() => {
      formAction({ id: detail.id, values: values as OrderDetailType });
    });
  }

  useServerActionFeedback(state, { refresh: true, back: true });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="sm:max-w-120 max-h-[97dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar producto</DialogTitle>
              <DialogDescription>
                Actualiza la información del producto.
              </DialogDescription>
            </DialogHeader>

            <OrderDetailForm form={form} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="button"
                className="min-w-20"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? <Spinner /> : 'Guardar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
