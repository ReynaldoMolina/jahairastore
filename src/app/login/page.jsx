'use client';

import LoginInput from "@/app/ui/login/LoginInput";
import Logo from '@/app/ui/login/logo.svg';
import { Suspense, useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <main className="flex min-h-screen bg-white dark:bg-neutral-800">
      <div className="flex flex-col flx-center bg-sky-50 dark:bg-neutral-900 shadow-lg rounded-none gap-5 h-screen p-10 w-full justify-center items-center sm:h-130 sm:w-100 sm:rounded-2xl m-auto">
        <Logo className="size-30" />

        <Suspense>
        <form
          className="flex flex-col w-full gap-6"
          action={formAction}>
          <LoginInput name="username" placeholder="Usuario" />
          <LoginInput name="password" placeholder="Contraseña" type="password" />

          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className="flex w-full h-10 cursor-pointer border-none bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 items-center justify-center"
            id="login-button"
            aria-disabled={isPending}
          >
            Iniciar sesión
          </button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
          </form>
        </Suspense>
      </div>
    </main>
  );
};