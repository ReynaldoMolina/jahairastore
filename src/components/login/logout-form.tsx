'use client';

import { handleLogout } from '@/server-actions/actions';
import { useActionState } from 'react';
import LoadingIcon from '../loading-icon';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

export default function LogoutForm() {
  const [state, formAction, isPending] = useActionState(
    handleLogout,
    undefined
  );

  return (
    <form action={formAction} className="w-full h-full max-w-3xl">
      <Button className="w-full" variant="destructive" disabled={isPending}>
        {isPending ? (
          <LoadingIcon />
        ) : (
          <>
            <LogOut />
            Cerrar sesión
          </>
        )}
      </Button>
    </form>
  );
}
