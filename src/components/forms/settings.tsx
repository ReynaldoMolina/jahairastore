'use client';

import { startTransition, useActionState } from 'react';
import { FormButtons, FormError } from './form-inputs/form-inputs';
import { updateSettings } from '@/server-actions/actions';
import { BusinessInfoType } from '@/types/types';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { settingsSchema } from './schemas/form-schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import FormInput from './form-inputs/form-input';

interface SettingsFormProps {
  businessInfo: BusinessInfoType;
}

export function SettingsForm({ businessInfo }: SettingsFormProps) {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: businessInfo
      ? {
          nombre_empresa: businessInfo.nombre_empresa ?? '',
          eslogan: businessInfo.eslogan ?? '',
          mensaje: businessInfo.mensaje ?? '',
        }
      : {
          nombre_empresa: '',
          eslogan: '',
          mensaje: '',
        },
  });

  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <main className="flex flex-col gap-4 items-center">
      <Form {...form}>
        <Card className="w-full mx-auto max-w-xl">
          <CardHeader className="border-b">
            <CardTitle>Información del negocio</CardTitle>
            <CardDescription>Edita la información del negocio</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormInput
                control={form.control}
                name="nombre_empresa"
                label="Nombre empresa"
              />
              <FormInput
                control={form.control}
                name="eslogan"
                label="Eslogan"
              />
              <FormInput
                control={form.control}
                name="mensaje"
                label="Mensaje"
              />
              <FormError isPending={isPending} state={state} />
              <FormButtons isNew={false} isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
