'use client';

import LoginInput from '@/app/ui/login/LoginInput';
import Logo from '@/app/ui/icons/logo.svg';
import Error from '@/app/ui/icons/error.svg';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <main className="flex min-h-screen bg-white dark:bg-black">
      <form
        className="flex flex-col flx-center bg-sky-100 dark:bg-neutral-900 shadow-lg rounded-none gap-6 h-screen px-10 py-18 w-full justify-center items-center sm:h-auto sm:w-100 sm:rounded-2xl m-auto"
        action={formAction}
      >
        <Logo className="size-25" />
        <LoginInput name="username" placeholder="Usuario" />
        <LoginInput name="password" placeholder="Contraseña" type="password" />

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          className={`flex w-full h-10 border-none rounded-lg text-white items-center font-semibold justify-center transition ${
            isPending
              ? 'cursor-not-allowed bg-blue-600'
              : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
          }`}
          id="login-button"
          disabled={isPending}
        >
          {isPending ? <LoadingIcon /> : 'Iniciar sesión'}
        </button>
        {!isPending && (
          <div
            className={`flex gap-2 justify-center items-center ${
              state || 'hidden'
            }`}
          >
            <Error className="size-5 text-red-500" />
            <p className="text-sm text-red-500 text-center">{state}</p>
          </div>
        )}
      </form>
    </main>
  );
}
