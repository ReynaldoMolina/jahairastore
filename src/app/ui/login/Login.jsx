import { useState } from "react";
import Link from "next/link";
import LoginInput from "@/app/ui/login/LoginInput";
import Logo from './logo.svg';
// import { useSendLoginData } from '../Hooks/useSendLoginData';
// import { Loading } from "../Loading";

export default function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState({
    username: '',
    password: ''
  });

  return (
    <main className="flex min-h-screen bg-white dark:bg-neutral-800">
      <div className="flex flex-col flx-center bg-sky-50 dark:bg-neutral-900 shadow-lg rounded-none gap-5 h-screen p-10 w-full justify-center items-center sm:h-130 sm:w-100 sm:rounded-2xl m-auto">
        <Logo className="size-30" />

        <form className="flex flex-col w-full gap-4">
          <LoginInput type="text" name="username" placeholder="Usuario" value={userData} setValue={setUserData} errorData={loginError} />
          <LoginInput type="password" name="password" placeholder="Contraseña" value={userData} setValue={setUserData} errorData={loginError} />
        </form>

        {/* <button
          type="submit"
          className="w-full h-10 cursor-pointer border-none bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
          id="login-button"
          onClick={() => alert('Login in development')}
        >
          {isLoading ? 'Cargando' : "Iniciar sesión"}
        </button> */}
        <Link
          href={'/'}
          className="flex w-full h-10 cursor-pointer border-none bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 items-center justify-center"
          id="login-button"
        >Iniciar sesión</Link>
      </div>
    </main>
  );
};