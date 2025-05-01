import React, { useState, useEffect } from "react";
import { useSendLoginData } from '../Hooks/useSendLoginData';
import logo from '../Home/store-logo.png';
import { LoginInput } from "./LoginInput";
import { ReactComponent as UsernameIcon } from './username.svg';
import { ReactComponent as PasswordIcon } from './password.svg';
import { Loading } from "../Loading";
import "./Login.css";

function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState({
    username: '',
    password: ''
  });
  const { data, isLoading, setShouldSubmit } = useSendLoginData(userData);

  function handleLoginData() {
    if (userData.username === "") {
      const newData = { username: "Escribe un usuario", password: '' }
      setLoginError(newData);
      return;
    } else if (userData.password === "") {
      const newData = { username: '', password: "Escribe una contraseña" }
      setLoginError(newData);
      return;
    }
    
    setLoginError({username: '', password: ''});
    setShouldSubmit(true);
  }

  useEffect(() => {
    if (data?.message) {
      if (data.message.toLowerCase().includes("usuario")) {
        setLoginError({ username: data.message, password: '' });
      } else if (data.message.toLowerCase().includes("contraseña")) {
        setLoginError({ username: '', password: data.message });
      }
    }
  }, [data]);

  return (
    <main className="flx login-main">
      <div className="flx flx-col flx-center login-container">
        <div className="flx flx-col flx-center login-logo">
          <img src={logo} alt="Logo"></img>
          <h2>¡Bienvenido!</h2>
        </div>

        <form className="flx flx-col flx-center login-data">
          <LoginInput type="text" name="username" placeholder="Usuario" value={userData} setValue={setUserData} errorData={loginError}>
            <UsernameIcon className="login-input-icon" />
          </LoginInput>
          <LoginInput type="password" name="password" placeholder="Contraseña" value={userData} setValue={setUserData} errorData={loginError}>
            <PasswordIcon className="login-input-icon" />
          </LoginInput>
        </form>

        <button
          type="submit"
          className="login-button"
          id="login-button"
          onClick={() => handleLoginData()}
        >
          {isLoading ? <Loading /> : "Login"}
        </button>

        {/* <div className="flx flx-center login-options">
          <a href="#">Reset password</a>
        </div> */}
      </div>
    </main>
  );
}

export { Login };