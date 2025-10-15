'use client';

import { useActionState } from 'react';
import { LogOut } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import { handleLogout } from '@/server-actions/actions';
import { Button } from '../ui/button';

export default function LogoutForm() {
  const [state, formAction, isPending] = useActionState(
    handleLogout,
    undefined
  );

  return (
    <form action={formAction} className="w-full h-full max-w-3xl">
      <Button variant="destructive" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Spinner />
            Cerrando sesión
          </>
        ) : (
          <>
            <LogOut className="size-5" />
            Cerrar sesión
          </>
        )}
      </Button>
    </form>
  );
}
