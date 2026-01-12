'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { TrasladoDetailType } from '@/types/types';
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
import { trasladoDetailSchema } from '../../validation/traslado';
import { updateTrasladoDetail } from '@/server-actions/traslado-detail';
import { DetailForm } from './form';

interface EditDetailDialogProps {
  detail: TrasladoDetailType;
}

export function EditDetailDialog({ detail }: EditDetailDialogProps) {
  const form = useForm<z.infer<typeof trasladoDetailSchema>>({
    resolver: zodResolver(trasladoDetailSchema),
    defaultValues: {
      idTraslado: detail.idTraslado,
      idProducto: detail.idProducto,
      cantidad: detail.cantidad,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateTrasladoDetail,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof trasladoDetailSchema>) {
    startTransition(() => {
      formAction({ id: detail.id, values: values as TrasladoDetailType });
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
