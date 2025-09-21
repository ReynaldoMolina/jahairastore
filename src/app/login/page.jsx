import { Suspense } from 'react';
import LoginForm from '../../components/login/LoginForm';

export const metadata = {
  title: 'Iniciar sesión'
}

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};