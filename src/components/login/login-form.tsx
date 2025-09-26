'use client';

import LoginInput from '@/components/login/login-input';
import Logo from '@/components/icons/logo.svg';
import { startTransition, useActionState } from 'react';
import { authenticate } from '@/server-actions/actions';
import { useSearchParams } from 'next/navigation';
import LoadingIcon from '../loading-icon';
import { CircleX } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { loginSchema } from '../forms/schemas/form-schemas';
import { Form } from '../ui/form';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      redirectTo: callbackUrl,
    },
  });

  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <main className="flex items-center bg-neutral-800 h-screen px-3">
      <Form {...form}>
        <Card className="mx-auto max-w-xs">
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 p-4 mb-0"
            >
              <Logo className="size-20 mx-auto" />
              <LoginInput
                control={form.control}
                name="username"
                label="Usuario"
              />
              <LoginInput
                control={form.control}
                name="password"
                label="Contraseña"
                type="password"
              />
              <LoginInput
                control={form.control}
                name="redirectTo"
                label=""
                hidden
              />

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                id="login-button"
                disabled={isPending}
              >
                {isPending ? <LoadingIcon /> : 'Iniciar sesión'}
              </Button>
              {!isPending && (
                <div
                  className={`flex gap-2 justify-center items-center ${
                    state || 'hidden'
                  }`}
                >
                  <CircleX className="size-5 text-red-500" />
                  <p className="text-sm text-red-500 text-center">{state}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
