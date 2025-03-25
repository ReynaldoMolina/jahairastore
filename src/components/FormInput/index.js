import React from "react";
import "./FormInput.css";

function FormInput({ name, holder, type = "text", value, setValue, readonly = false, autocomplete = "off" }) {
  return (
    <div className="flx flx-col">
      <label
        htmlFor={name}
        className="frm-input-label"
      >
        {holder}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="frm-input"
        placeholder={holder}
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value
          }
          setValue(newValue);
        }}
        readOnly={readonly}
        autoComplete={autocomplete}
      >
      </input>
    </div>
  )
}

export { FormInput };