'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { ProviderById } from '@/types/types';
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
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { stateDefault } from '@/server-actions/stateMessage';
import { providerSchema } from '../validation/provider';
import { updateProvider } from '@/server-actions/provider';
import { ProviderForm } from './form';

interface EditProviderFormDialog {
  provider: ProviderById;
}

export function EditProviderFormDialog({ provider }: EditProviderFormDialog) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombreEmpresa: provider.nombreEmpresa,
      nombreContacto: provider.nombreContacto,
      telefono: provider.telefono || '',
      direccion: provider.direccion,
      imagenUrl: provider.imagenUrl || '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateProvider,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ id: provider.id, values: values as ProviderById });
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
              <DialogTitle>{provider.nombreEmpresa}</DialogTitle>
              <DialogDescription>
                Edita la información del proveedor.
              </DialogDescription>
            </DialogHeader>

            <ProviderForm form={form} />

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
