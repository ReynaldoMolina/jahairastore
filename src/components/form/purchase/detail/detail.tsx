'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { PurchaseDetailType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
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
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { purchaseDetailSchema } from '../../validation/purchase';
import { updatePurchaseDetail } from '@/server-actions/purchase-detail';
import { PurchaseDetailForm } from './form';

interface EditPurchaseDetailDialog {
  detail: PurchaseDetailType;
}

export function EditPurchaseDetailDialog({ detail }: EditPurchaseDetailDialog) {
  const form = useForm<z.infer<typeof purchaseDetailSchema>>({
    resolver: zodResolver(purchaseDetailSchema),
    defaultValues: {
      idProducto: detail.idProducto,
      costo: detail.costo,
      cantidad: detail.cantidad,
      cambioDolar: detail.cambioDolar,
      idCompra: detail.idCompra,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updatePurchaseDetail,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof purchaseDetailSchema>) {
    startTransition(() => {
      formAction({ id: detail.id, values: values as PurchaseDetailType });
    });
  }

  useServerActionFeedback(state, { refresh: true, back: true });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="sm:max-w-xl max-h-[97dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar producto</DialogTitle>
              <DialogDescription>
                Actualiza la información, haz click en guardar cuando estés
                listo.
              </DialogDescription>
            </DialogHeader>

            <PurchaseDetailForm form={form} detail={detail} />

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
