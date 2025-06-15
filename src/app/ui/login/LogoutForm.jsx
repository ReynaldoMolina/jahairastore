'use client';

import Logout from '@/app/ui/icons/logout.svg';
import { handleLogout } from '@/app/lib/actions';
import { useActionState } from 'react';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

export default function LogoutForm() {
  const [errorMessage, formAction, isPending] = useActionState(handleLogout, undefined);

  return (
    <form action={formAction}>
      <button className="flex cursor-pointer">
        {isPending ?
          <LoadingIcon /> :
          <Logout className="size-9 p-2 rounded-full hover:bg-white hover:dark:bg-neutral-700 cursor-pointer" />
        }
      </button>
    </form>
  );
}