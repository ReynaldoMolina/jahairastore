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
import {
  ProductSearchTrasladoData,
  TrasladoById,
  TrasladoFormType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stateDefault } from '@/server-actions/stateMessage';
import { trasladoSchema } from '../validation/traslado';
import { updateTraslado } from '@/server-actions/traslado';
import { TrasladoForm } from './form';
import { FormDetail } from './form-detail';

interface EditTrasladoFormProps {
  productData: ProductSearchTrasladoData;
  traslado: TrasladoById;
}

export function EditTrasladoForm({
  traslado,
  productData,
}: EditTrasladoFormProps) {
  const form = useForm<z.infer<typeof trasladoSchema>>({
    resolver: zodResolver(trasladoSchema),
    defaultValues: {
      fecha: traslado.fecha,
      idUbicacionOrigen: traslado.idUbicacionOrigen,
      idUbicacionDestino: traslado.idUbicacionDestino,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateTraslado,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof trasladoSchema>) {
    startTransition(() => {
      formAction({ id: traslado.id, values: values as TrasladoFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Tabs defaultValue="productos">
      <TabsList className="w-full sm:w-fit overflow-x-auto">
        <TabsTrigger value="productos">Productos</TabsTrigger>
        <TabsTrigger value="info">Información</TabsTrigger>
      </TabsList>
      <TabsContent value="productos" className="space-y-3">
        <FormDetail traslado={traslado} productData={productData} />
      </TabsContent>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>Editar traslado</CardTitle>
                <CardDescription>
                  Actualiza los datos del traslado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrasladoForm form={form} />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
