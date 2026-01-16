'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { updateClient } from '@/server-actions/client';
import { ClientById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
import { clientSchema } from '../validation/client';
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
import { ClientForm } from './form';

interface EditClientFormDialog {
  client: ClientById;
}

export function EditClientFormDialog({ client }: EditClientFormDialog) {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: client.nombre,
      apellido: client.apellido,
      telefono: client.telefono || '',
      direccion: client.direccion,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateClient,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ id: client.id, values: values as ClientById });
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
              <DialogTitle>Editar cliente</DialogTitle>
              <DialogDescription>
                Edita la información del cliente.
              </DialogDescription>
            </DialogHeader>

            <ClientForm form={form} />

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
