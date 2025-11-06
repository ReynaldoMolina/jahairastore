'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { updateProduct } from '@/server-actions/product';
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/components/use-server-status';
import { ProductForm } from './form';
import { Form } from '@/components/ui/form';
import { productSchema } from '../validation/product';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

interface EditProductFormDialog {
  product: ProductFormType;
}

export function EditProductFormDialog({ product }: EditProductFormDialog) {
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

  const router = useRouter();

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction({ id: product.id, values: values as ProductFormType });
      router.refresh();
    });
  }

  useServerActionFeedback(state);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="w-full sm:max-w-xl max-h-[95dvh] overflow-y-auto">
            <DialogHeader className="border-b pb-6">
              <DialogTitle>Producto {product.id}</DialogTitle>
              <DialogDescription>
                Edita la información del producto.
              </DialogDescription>
            </DialogHeader>

            <ProductForm form={form} />

            <DialogFooter className="border-t pt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full md:w-25"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : 'Guardar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
