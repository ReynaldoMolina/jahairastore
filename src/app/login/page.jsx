import { Suspense } from 'react';
import LoginForm from '../ui/login/LoginForm';

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};