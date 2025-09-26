import LoginForm from '@/components/login/login-form';
import { Suspense } from 'react';
<<<<<<< Updated upstream
import LoginForm from '../ui/login/LoginForm';
=======
>>>>>>> Stashed changes

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