'use client';

import LoginInput from "@/app/ui/login/LoginInput";
import Logo from '@/app/ui/login/logo.svg';

export default function Page() {
  return (
    <main className="flex min-h-screen bg-white dark:bg-neutral-800">
      <div className="flex flex-col flx-center bg-sky-50 dark:bg-neutral-900 shadow-lg rounded-none gap-5 h-screen p-10 w-full justify-center items-center sm:h-130 sm:w-100 sm:rounded-2xl m-auto">
        <Logo className="size-30" />

        <form
          className="flex flex-col w-full gap-6">
          <LoginInput name="username" placeholder="Usuario" />
          <LoginInput type="password" name="password" placeholder="Contraseña" />

          <button
            type="submit"
            className="flex w-full h-10 cursor-pointer border-none bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 items-center justify-center"
            id="login-button"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
};