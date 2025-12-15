'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { ClientById } from '@/types/types';
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
import { clientSchema } from '../validation/client';
import { ClientForm } from './form';
import { createClient } from '@/server-actions/client';

export function CreateClientFormDialog() {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '+505 ',
      municipio: 'León',
      departamento: null,
      pais: null,
      direccion: '',
      idUsuario: null,
      imagenUrl: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createClient,
    stateDefault
  );

  const router = useRouter();

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ values: values as ClientById });
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
              <DialogTitle>Crear cliente</DialogTitle>
              <DialogDescription>
                Agrega la información del cliente.
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
