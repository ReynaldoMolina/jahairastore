'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import {
  ProductSearchData,
  SaleById,
  SaleFormType,
  SelectOptions,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { saleSchema } from '../validation/sale';
import { SaleForm } from './form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stateDefault } from '@/server-actions/stateMessage';
import { updateSale } from '@/server-actions/sale';
import { FormDetail } from './form-detail';
import { SaleOptions } from './options';

interface EditSaleForm {
  productData: ProductSearchData;
  sale: SaleById;
  selectOptions: SelectOptions[];
}

export function EditSaleForm({
  productData,
  sale,
  selectOptions,
}: EditSaleForm) {
  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      idCliente: sale.idCliente,
      fecha: sale.fecha,
      abono: sale.abono,
      credito: sale.credito,
      cambioDolar: sale.cambioDolar,
      saldo: sale.saldo,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSale,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof saleSchema>) {
    startTransition(() => {
      formAction({ id: sale.id, values: values as SaleFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Tabs defaultValue="productos">
      <TabsList className="w-full sm:w-fit">
        <TabsTrigger value="info">Información</TabsTrigger>
        <TabsTrigger value="productos">Productos</TabsTrigger>
        <TabsTrigger value="recibo" disabled={sale.detail.length < 1}>
          Recibo
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardContent>
                <SaleForm
                  form={form}
                  sale={sale}
                  selectOptions={selectOptions}
                />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="productos" className="space-y-3">
        <FormDetail productData={productData} sale={sale} />
      </TabsContent>
      <TabsContent value="recibo" className="space-y-3">
        <Card className="max-w-xl">
          <CardContent className="space-y-3">
            <SaleOptions sale={sale} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
