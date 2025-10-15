'use client';

import Logo from '@/components/icons/logo.svg';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { authenticate } from '@/server-actions/actions';
import { LoginInput } from './login-input';
import { CircleAlert } from 'lucide-react';
import { Button } from '../ui/button';

export function LoginForm() {
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
        <Button
          className="w-full text-white bg-blue-500 hover:bg-blue-600"
          id="login-button"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Iniciando sesión
            </>
          ) : (
            'Iniciar sesión'
          )}
        </Button>
        {!isPending && (
          <div
            className={`flex gap-2 justify-center items-center ${
              state || 'hidden'
            }`}
          >
            <CircleAlert className="size-5 text-red-500" />
            <p className="text-sm text-red-500 text-center">{state}</p>
          </div>
        )}
      </form>
    </main>
  );
}
