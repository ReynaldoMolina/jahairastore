'use client';

import Image from 'next/image';
import Logout from './logout.svg';
import { handleLogout } from '@/app/lib/actions';
import { useActionState } from 'react';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

export default function HeaderProfile() {
  const user = {
    username: 'Reynaldo',
    pictureUrl: 'https://lh3.googleusercontent.com/ogw/AF2bZyjG_cSPuxnR0fNtDzSndXzPIy3-GzgtoIqJcc2Z03fOpDc=s32-c-mo',
  }

  const [errorMessage, formAction, isPending] = useActionState(handleLogout, undefined);

  return (
    <form
      className="flex flex-col absolute p-7 bg-white dark:bg-neutral-700 rounded-2xl justify-center items-center right-0 top-12 gap-4 shadow-sm z-1"
      action={formAction}
    >
      <Image src={user.pictureUrl} alt="User picture" width={32} height={32} className="size-12 rounded-full" />
      <h2
        className='text-sm'
      >{`¡Hola, ${user.username}!`}</h2>
      <button
        className="flex p-2 rounded-xl bg-red-200 dark:bg-red-700 gap-2 items-center justify-center cursor-pointer w-38"
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