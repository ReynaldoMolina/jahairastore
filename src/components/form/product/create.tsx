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
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { ProductForm } from './form';
import { FormCardFooter } from '@/components/form-element/form-footer';
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
      precioCompra: 0,
      precioVenta: undefined,
      precioVentaPorMayor: 0,
      fecha: currentDate,
      codigo: null,
      cambioDolar: cambioDolar,
      precioEnCordobas: true,
      imagenUrl: null,
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
            <ProductForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
