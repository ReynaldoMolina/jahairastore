'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import * as z from 'zod';
import { createProduct } from '@/server-actions/product';
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
import { getCurrentDate } from '@/lib/get-date';
import { FieldSet } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateProductFormDialog {
  cambioDolar: number;
}

export function CreateProductFormDialog({
  cambioDolar,
}: CreateProductFormDialog) {
  const currentDate = getCurrentDate();
  const [createMultiple, setCreateMultiple] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      idProveedor: null,
      nombre: '',
      descripcion: null,
      precioCompra: 0,
      precioVenta: 0,
      idCategoria: null,
      fecha: currentDate,
      idShein: null,
      inventario: false,
      cambioDolar: cambioDolar,
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
    });
  }

  useServerActionFeedback(state, { refresh: true, back: !createMultiple });

  useEffect(() => {
    if (state.success && createMultiple) form.reset();
  }, [state]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Dialog open={true} onOpenChange={() => router.back()}>
          <DialogContent className="w-full sm:max-w-xl max-h-[95dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear producto</DialogTitle>
              <DialogDescription>
                Agrega la información del producto.
              </DialogDescription>
            </DialogHeader>

            <ProductForm form={form} />

            <FieldSet>
              <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  checked={!!createMultiple}
                  onCheckedChange={() => setCreateMultiple((prev) => !prev)}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none">
                    ¿Crear varios productos?
                  </p>
                </div>
              </Label>
            </FieldSet>

            <DialogFooter>
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
