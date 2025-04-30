import React from "react";
import "./Login.css";

function LoginInput({ children, type, name, placeholder, value, setValue, errorData }) {
  return (
    <div className="flx flx-col login-input">
      <div className="flx flx-center login-input-div">
        {children}
        <input
          type={type}
          className={`frm-input frm-input-login ${name}`}
          placeholder={placeholder}
          value={value[name]}
          onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value
          }
          setValue(newValue);
        }}
          ></input>
      </div>
      <span className="user-data-error">{errorData[name]}</span>
    </div>
  );
}

export { LoginInput };