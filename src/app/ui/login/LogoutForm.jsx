'use client';

import Logout from '@/app/ui/icons/logout.svg';
import { handleLogout } from '@/app/lib/actions';
import { useActionState } from 'react';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

export default function LogoutForm() {
  const [errorMessage, formAction, isPending] = useActionState(handleLogout, undefined);

  return (
    <form
      className="flex flex-col mt-5 justify-center items-center gap-7"
      action={formAction}
    >
      <h2
        className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">¡Hola, Jahaira! ¡Vos podés!</h2>
      <button
        className="flex p-2 rounded-xl bg-red-200 dark:bg-red-900 gap-2 items-center justify-center cursor-pointer w-38"
      >
        {isPending ? <LoadingIcon /> : (
          <>
            <Logout className="logout-icon"/>
            <span className='text-sm'>Cerrar sesión</span>
          </>
        )}
      </button>
    </form>
  );
}