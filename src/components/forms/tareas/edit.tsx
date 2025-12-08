'use tarea';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import { TareaById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { tareaSchema } from '../validation/tarea';
import { updateTarea } from '@/server-actions/tarea';
import { TareaForm } from './form';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditTareaForm {
  tarea: TareaById;
}

export function EditTareaForm({ tarea }: EditTareaForm) {
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

  function onSubmit(values: z.infer<typeof tareaSchema>) {
    startTransition(() => {
      formAction({ id: tarea.id, values: values as TareaById });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <DialogHeader>
            <DialogTitle>Editar tarea</DialogTitle>
            <DialogDescription>
              Edita la información de la tarea.
            </DialogDescription>
          </DialogHeader>
          <CardContent className="space-y-6">
            <TareaForm form={form} />
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
