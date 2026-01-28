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
import { updateProduct } from '@/server-actions/product';
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { ProductForm } from './form';
import { FormCardFooter } from '@/components/form-element/form-footer';
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
      costo: product.costo,
      precioVenta: product.precioVenta,
      precioVentaPorMayor: product.precioVentaPorMayor,
      codigo: product.codigo,
      cambioDolar: product.cambioDolar,
      precioEnDolares: product.precioEnDolares ?? false,
      imagenUrl: product.imagenUrl,
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
          <CardHeader>
            <CardTitle>Producto {product.id}</CardTitle>
            <CardDescription>
              Edita la información del producto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm form={form} />
          </CardContent>
          <FormCardFooter isNew={false} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
