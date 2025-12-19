'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { updateProduct } from '@/server-actions/product';
import { ProductFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
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
import { stateDefault } from '@/server-actions/stateMessage';

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
      precioVentaPorMayor: product.precioVentaPorMayor,
      fecha: product.fecha,
      codigo: product.codigo,
      cambioDolar: product.cambioDolar,
      precioEnCordobas: product.precioEnCordobas ?? false,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateProduct,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction({ id: product.id, values: values as ProductFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true, back: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="w-full sm:max-w-xl max-h-[97dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Producto {product.id}</DialogTitle>
              <DialogDescription>
                Edita la información del producto.
              </DialogDescription>
            </DialogHeader>

            <ProductForm form={form} />

            <DialogFooter>
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
