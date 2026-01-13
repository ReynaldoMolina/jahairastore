'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { AjusteInventarioDetailType } from '@/types/types';
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
import { DetailForm } from './form';
import { ajusteInventarioDetailSchema } from '../../validation/ajuste-inventario';
import { updateAjusteInventarioDetail } from '@/server-actions/ajuste-inventario-detail';

interface EditDetailDialogProps {
  detail: AjusteInventarioDetailType;
}

export function EditDetailDialog({ detail }: EditDetailDialogProps) {
  const form = useForm<z.infer<typeof ajusteInventarioDetailSchema>>({
    resolver: zodResolver(ajusteInventarioDetailSchema),
    defaultValues: {
      idAjuste: detail.idAjuste,
      idProducto: detail.idProducto,
      cantidad: detail.cantidad,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateAjusteInventarioDetail,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof ajusteInventarioDetailSchema>) {
    startTransition(() => {
      formAction({
        id: detail.id,
        values: values as AjusteInventarioDetailType,
      });
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

            <DetailForm form={form} detail={detail} />

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
