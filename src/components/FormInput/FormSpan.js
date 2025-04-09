import React from "react";
import "./FormInput.css";

function FormSpan({ name, holder, value, type = 'text' }) {
  return (
    <div className="flx flx-col frm-input-div">
      <label
        htmlFor={name}
        className="frm-input-label"
      >
        {holder}
      </label>
      <span
        name={name}
        id={name}
        className={`flx frm-input frm-span ${name}`}
      >
        {type === 'text' ? value : value.toFixed(2)}
      </span>
    </div>
  )
}

export { FormSpan };