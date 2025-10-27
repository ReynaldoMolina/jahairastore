'use client';

import { useActionState } from 'react';
import { LogOut } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LogoutForm() {
  const router = useRouter();

  async function logOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('login');
        },
      },
    });
  }

  const [state, formAction, isPending] = useActionState(logOut, undefined);

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
