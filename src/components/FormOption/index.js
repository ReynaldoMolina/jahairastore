import React from "react";

function FormOption({ label, children, action }) {
  return (
    <button
      type="button"
      className="flx flx-center option-button"
      onClick={action}>
      {children}
      <label className="option-button-label">
        {label}
      </label>
    </button>
  )
}

export { FormOption };