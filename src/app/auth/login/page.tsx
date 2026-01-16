import { LoginForm } from '@/components/form/login/login-form';
import { Suspense } from 'react';

export const metadata = {
  title: 'Iniciar sesión',
};

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
