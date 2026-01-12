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
  AjusteInventarioById,
  AjusteInventarioFormType,
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
import { FormDetail } from './form-detail';
import { ajusteInventarioSchema } from '../validation/ajuste-inventario';
import { updateAjusteInventario } from '@/server-actions/ajuste-inventario';
import { AjusteInventarioForm } from './form';

interface EditFormProps {
  productData: ProductSearchTrasladoData;
  ajuste: AjusteInventarioById;
}

export function EditForm({ ajuste, productData }: EditFormProps) {
  const form = useForm<z.infer<typeof ajusteInventarioSchema>>({
    resolver: zodResolver(ajusteInventarioSchema),
    defaultValues: {
      fecha: ajuste.fecha,
      idUbicacion: ajuste.idUbicacion,
      motivo: ajuste.motivo,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateAjusteInventario,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof ajusteInventarioSchema>) {
    startTransition(() => {
      formAction({ id: ajuste.id, values: values as AjusteInventarioFormType });
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
        <FormDetail ajuste={ajuste} productData={productData} />
      </TabsContent>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>Editar ajuste</CardTitle>
                <CardDescription>
                  Actualiza los datos del ajuste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AjusteInventarioForm form={form} />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
