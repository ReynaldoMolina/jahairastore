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
import { createProduct } from '@/server-actions/product';
import { ProductFormType, SelectOptions } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { ProductForm } from './form';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { Form } from '@/components/ui/form';
import { productSchema } from '../validation/product';

interface CreateProductForm {
  cambioDolar: number;
  categories: SelectOptions[];
}

export function CreateProductForm({
  cambioDolar,
  categories,
}: CreateProductForm) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: '',
      costo: 0,
      precioVenta: 0,
      precioVentaPorMayor: 0,
      codigo: null,
      cambioDolar: cambioDolar,
      precioEnDolares: false,
      imagenUrl: null,
      idCategoria: 0,
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
          <CardHeader>
            <CardTitle>Crear producto</CardTitle>
            <CardDescription>
              Ingresa los datos, da click en crear cuando estés listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm form={form} categories={categories} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
