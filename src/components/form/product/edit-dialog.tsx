'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { updateProduct } from '@/server-actions/product';
import { ProductFormType, SelectOptions } from '@/types/types';
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
  categories: SelectOptions[];
}

export function EditProductFormDialog({
  product,
  categories,
}: EditProductFormDialog) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: product.nombre,
      costo: product.costo,
      precioVenta: product.precioVenta,
      precioVentaPorMayor: product.precioVentaPorMayor,
      codigo: product.codigo,
      cambioDolar: product.cambioDolar,
      precioEnDolares: product.precioEnDolares ?? false,
      imagenUrl: product.imagenUrl,
      idCategoria: product.idCategoria,
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

            <ProductForm
              form={form}
              productId={product.id}
              categories={categories}
            />

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
