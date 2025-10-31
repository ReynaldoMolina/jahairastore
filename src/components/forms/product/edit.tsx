'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import { updateProduct } from '@/server-actions/product';
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/components/use-server-status';
import { ProductForm } from './form';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { productSchema } from '../validation/product';

interface EditProductForm {
  product: ProductFormType;
}

export function EditProductForm({ product }: EditProductForm) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      idProveedor: product.idProveedor,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precioCompra: product.precioCompra,
      precioVenta: product.precioVenta,
      idCategoria: product.idCategoria,
      fecha: product.fecha,
      idShein: product.idShein,
      inventario: product.inventario,
      cambioDolar: product.cambioDolar,
      precioEnCordobas: product.precioEnCordobas ?? false,
    },
  });

  const [state, formAction, isPending] = useActionState(updateProduct, {
    success: undefined,
    title: undefined,
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction({ id: product.id, values: values as ProductFormType });
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
          <FormCardFooter isNew={false} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
