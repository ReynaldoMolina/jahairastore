'use client';

import { startTransition, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import * as z from 'zod';
import { TareaById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { TareaForm } from './form';
import { tareaSchema } from '../validation/tarea';
import { createTarea } from '@/server-actions/tarea';

export function CreateTareaForm() {
  const form = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: {
      tarea: '',
      fecha_entrega: '',
      estado: 'Pendiente',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createTarea,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof tareaSchema>) {
    startTransition(() => {
      formAction({ values: values as TareaById });
    });
  }

  useServerActionFeedback(state);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Nueva tarea</CardTitle>
            <CardDescription>
              Agrega la información de la tarea.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TareaForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
