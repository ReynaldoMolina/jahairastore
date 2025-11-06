'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { createProduct } from '@/server-actions/product';
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
import { getCurrentDate } from '@/lib/get-date';

export function CreateProductFormDialog() {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      idProveedor: null,
      nombre: '',
      descripcion: null,
      precioCompra: undefined,
      precioVenta: undefined,
      idCategoria: null,
      fecha: currentDate,
      idShein: null,
      inventario: false,
      cambioDolar: 37,
      precioEnCordobas: false,
    },
  });

  const [state, formAction, isPending] = useActionState(createProduct, {
    success: undefined,
    title: undefined,
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(() => {
      formAction({ values: values as ProductFormType });
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
              <DialogTitle>Crear producto</DialogTitle>
              <DialogDescription>
                Agrega la información del producto.
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
                className="w-full sm:w-25"
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
