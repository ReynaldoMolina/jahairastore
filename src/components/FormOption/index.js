import React from "react";

function FormOption({ label, children, action }) {
  return (
    <div
      className="flx flx-center option-button"
      onClick={action}>
      {children}
      <label className="option-button-label">
        {label}
      </label>
    </div>
  )
}

export { FormOption };