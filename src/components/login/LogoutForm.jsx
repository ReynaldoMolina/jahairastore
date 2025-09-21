'use client';

import Logout from '@/app/ui/icons/logout.svg';
import { handleLogout } from '@/app/lib/actions';
import { useActionState } from 'react';
import LoadingIcon from '@/components/loading/LoadingIcon';

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
          <LoadingIcon />
        ) : (
          <div className="flex gap-2 justify-center md:justify-start items-center font-bold text-xs">
            <Logout className="size-5" />
            Cerrar sesión
          </div>
        )}
      </button>
    </form>
  );
}
