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
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { stateDefault } from '@/server-actions/stateMessage';
import { TareaForm } from './form';
import { tareaSchema } from '../validation/tarea';
import { updateTarea } from '@/server-actions/tarea';

interface EditTareaFormDialog {
  tarea: TareaById;
}

export function EditTareaFormDialog({ tarea }: EditTareaFormDialog) {
  const form = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: {
      tarea: tarea.tarea,
      fecha_entrega: tarea.fecha_entrega,
      prioridad: tarea.prioridad,
      estado: tarea.estado,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateTarea,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof tareaSchema>) {
    startTransition(() => {
      formAction({ id: tarea.id, values: values as TareaById });
    });
  }

  useServerActionFeedback(state, { refresh: true, back: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="w-full sm:max-w-xl max-h-[97dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tarea {tarea.id}</DialogTitle>
              <DialogDescription>
                Edita la información de la tarea.
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
                className="w-full md:w-25"
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
