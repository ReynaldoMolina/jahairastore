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
    <main className="flex min-h-screen bg-white dark:bg-neutral-800">
      <div className="flex flex-col flx-center bg-sky-50 dark:bg-neutral-900 shadow-lg rounded-none gap-5 h-screen p-10 w-full justify-center items-center sm:h-130 sm:w-100 sm:rounded-2xl m-auto">
        <Logo className="size-30" />

        <form className="flex flex-col w-full gap-6" action={formAction}>
          <LoginInput name="username" placeholder="Usuario" />
          <LoginInput
            name="password"
            placeholder="Contraseña"
            type="password"
          />

          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className={`flex w-full h-10 border-none rounded-lg text-white font-semibold items-center justify-center transition ${
              isPending
                ? 'cursor-not-allowed bg-neutral-300 dark:bg-neutral-700'
                : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
            }`}
            id="login-button"
            disabled={isPending}
          >
            {isPending ? <LoadingIcon /> : 'Iniciar sesión'}
          </button>
          <div
            className={`flex gap-2 justify-center items-center ${
              state || 'hidden'
            }`}
          >
            <Error className="size-5 text-red-500" />
            <p className="text-sm text-red-500 text-center">{state}</p>
          </div>
        </form>
      </div>
    </main>
  );
}
