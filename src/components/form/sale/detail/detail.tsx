'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { SaleDetailType } from '@/types/types';
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
import { saleDetailSchema } from '../../validation/sale';
import { updateSaleDetail } from '@/server-actions/sale-detail';
import { SaleDetailForm } from './form';

interface EditSaleDetailDialog {
  detail: SaleDetailType;
}

export function EditSaleDetailDialog({ detail }: EditSaleDetailDialog) {
  const form = useForm<z.infer<typeof saleDetailSchema>>({
    resolver: zodResolver(saleDetailSchema),
    defaultValues: {
      idVenta: detail.idVenta,
      idProducto: detail.idProducto,
      precioVenta: detail.precioVenta,
      precioVentaPorMayor: detail.precioVentaPorMayor,
      costo: detail.costo,
      cantidad: detail.cantidad,
      precioPorMayor: detail.precioPorMayor,
      cambioDolar: detail.cambioDolar,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSaleDetail,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof saleDetailSchema>) {
    startTransition(() => {
      formAction({ id: detail.id, values: values as SaleDetailType });
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
                Actualiza la información del producto.
              </DialogDescription>
            </DialogHeader>

            <SaleDetailForm form={form} detail={detail} />

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
