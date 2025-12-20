'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import { createProduct } from '@/server-actions/product';
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { ProductForm } from './form';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { productSchema } from '../validation/product';
import { getCurrentDate } from '@/lib/get-date';

interface CreateProductForm {
  cambioDolar: number;
}

export function CreateProductForm({ cambioDolar }: CreateProductForm) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      idProveedor: null,
      nombre: '',
      descripcion: null,
      precioCompra: undefined,
      precioVenta: undefined,
      precioVentaPorMayor: 0,
      fecha: currentDate,
      codigo: null,
      cambioDolar: cambioDolar,
      precioEnCordobas: false,
    },
  });

  const [state, formAction, isPending] = useActionState(createProduct, {
    success: undefined,
    title: undefined,
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction({ values: values as ProductFormType });
    });
  }

  useServerActionFeedback(state);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardContent>
            <ProductForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
