import React from "react";
import "./FormInput.css";

function FormInput({ name, holder, type = "text", value, setValue, readonly = false }) {
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
        // placeholder={holder}
        value={value[name]}
        onChange={(event) => {
          const {id, ...valueNoId} = value;
          const newValue = {
            ...valueNoId,
            [name]: event.target.value
          }
          setValue(newValue)
        }}
        readOnly={readonly}
      >
      </input>
    </div>
  )
}

export { FormInput };