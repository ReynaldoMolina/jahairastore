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
  ProductSearchData,
  PurchaseById,
  PurchaseFormType,
  SelectOptions,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { purchaseSchema } from '../validation/purchase';
import { PurchaseForm } from './form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stateDefault } from '@/server-actions/stateMessage';
import { updatePurchase } from '@/server-actions/purchase';
import { FormDetail } from './form-detail';
import { PurchaseOptions } from './options';

interface EditPurchaseForm {
  productData: ProductSearchData;
  purchase: PurchaseById;
  selectOptions: SelectOptions[];
}

export function EditPurchaseForm({
  productData,
  purchase,
  selectOptions,
}: EditPurchaseForm) {
  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      idProveedor: purchase.idProveedor,
      fecha: purchase.fecha,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updatePurchase,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof purchaseSchema>) {
    startTransition(() => {
      formAction({ id: purchase.id, values: values as PurchaseFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Tabs defaultValue="productos">
      <TabsList className="w-full sm:w-fit">
        <TabsTrigger value="info">Información</TabsTrigger>
        <TabsTrigger value="productos">Productos</TabsTrigger>
        <TabsTrigger value="gastos">Gastos</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>Editar compra</CardTitle>
                <CardDescription>
                  Actualiza la información de la compra.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PurchaseForm
                  form={form}
                  purchase={purchase}
                  selectOptions={selectOptions}
                />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="productos" className="space-y-3">
        <FormDetail productData={productData} purchase={purchase} />
      </TabsContent>
      <TabsContent value="gastos">
        <PurchaseOptions purchase={purchase} />
      </TabsContent>
    </Tabs>
  );
}
