'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { TareaById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
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
import { stateDefault } from '@/server-actions/stateMessage';
import { useRouter } from 'next/navigation';
import { TareaForm } from './form';
import { tareaSchema } from '../validation/tarea';
import { createTarea } from '@/server-actions/tarea';

export function CreateTareaFormDialog() {
  const form = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: {
      tarea: '',
      fecha_entrega: '',
      prioridad: '',
      estado: 'Pendiente',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createTarea,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof tareaSchema>) {
    startTransition(() => {
      formAction({ values: values as TareaById });
    });
  }

  useServerActionFeedback(state, { back: true, refresh: true });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="w-full sm:max-w-xl max-h-[95dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear tarea</DialogTitle>
              <DialogDescription>
                Agrega la información de la tarea.
              </DialogDescription>
            </DialogHeader>

            <TareaForm form={form} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full sm:w-25"
                disabled={isPending}
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
