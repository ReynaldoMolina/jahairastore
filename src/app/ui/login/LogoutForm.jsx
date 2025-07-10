'use client';

import Logout from '@/app/ui/icons/logout.svg';
import { handleLogout } from '@/app/lib/actions';
import { useActionState } from 'react';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

export default function LogoutForm() {
  const [state, formAction, isPending] = useActionState(
    handleLogout,
    undefined
  );

  return (
    <form action={formAction} className="w-full h-full">
      <button
        className={`flex w-full min-w-17 justify-center items-center rounded-lg gap-1 p-2 md:py-4 text-xs text-center ${
          isPending
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/70'
        }`}
        disabled={isPending}
      >
        {isPending ? (
          <LoadingIcon />
        ) : (
          <div className="flex flex-col gap-1 justify-center md:justify-start items-center text-red-700 dark:text-red-300">
            <Logout className="size-5 text-red-700 dark:text-red-300" />
            Salir
          </div>
        )}
      </button>
    </form>
  );
}
