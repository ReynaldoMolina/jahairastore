'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
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
import { Spinner } from '@/components/ui/spinner';
import { stateDefault } from '@/server-actions/stateMessage';
import { useRouter } from 'next/navigation';
import { categorySchema } from '../validation/product-category';
import { createCategory } from '@/server-actions/product-category';
import { CategoryById } from '@/types/types';
import { CategoryForm } from './form';

export function CreateCategoryFormDialog() {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createCategory,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction({ values: values as CategoryById });
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
          <DialogContent className="w-full sm:max-w-xl max-h-[95dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear categoría</DialogTitle>
              <DialogDescription>
                Agrega la información de la categoría.
              </DialogDescription>
            </DialogHeader>

            <CategoryForm form={form} />

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
