'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { OrderDetailForm } from './form';
import { createOrderDetail } from '@/server-actions/order-detail';
import { Spinner } from '@/components/ui/spinner';

interface CreateOrderDetailForm {
  orderId: number;
}

export function CreateOrderDetailForm({ orderId }: CreateOrderDetailForm) {
  const form = useForm<z.infer<typeof orderDetailSchema>>({
    resolver: zodResolver(orderDetailSchema),
    defaultValues: {
      idPedido: orderId,
      nombreProducto: '',
      precioVenta: 0,
      precioCompra: 0,
      cantidad: 1,
      imagenUrl: '',
    },
  });

  const [createMultiple, setCreateMultiple] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    createOrderDetail,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof orderDetailSchema>) {
    startTransition(() => {
      formAction({ values: values as OrderDetailType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  useEffect(() => {
    if (!createMultiple) setOpen(false);
    if (state.success) form.reset();
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-fit" type="button" variant="outline">
              <Plus />
              Agregar producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-120 max-h-[97dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar producto</DialogTitle>
              <DialogDescription>
                Agrega la información del producto.
              </DialogDescription>
            </DialogHeader>

            <OrderDetailForm
              form={form}
              createMultiple={createMultiple}
              setCreateMultiple={setCreateMultiple}
              isNew
            />

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
