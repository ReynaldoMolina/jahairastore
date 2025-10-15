'use client';

import { useActionState } from 'react';
import { LogOut } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import { handleLogout } from '@/server-actions/actions';

export default function LogoutForm() {
  const [state, formAction, isPending] = useActionState(
    handleLogout,
    undefined
  );

  return (
    <form action={formAction} className="w-full h-full max-w-3xl">
      <button
        className={`flex w-full justify-center items-center rounded-lg gap-2 p-3 text-xs text-center bg-red-200 shadow dark:bg-red-800/70 ${
          isPending
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-red-300 dark:hover:bg-red-700/70'
        }`}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <div className="flex gap-2 justify-center md:justify-start items-center font-bold text-xs">
            <LogOut className="size-5" />
            Cerrar sesión
          </div>
        )}
      </button>
    </form>
  );
}
