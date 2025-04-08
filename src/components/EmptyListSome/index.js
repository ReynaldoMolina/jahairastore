import React from "react";
import "./EmptyListSome.css";

function EmptyListSome({ message }) {
  return (
    <div className="flx flx-col flx-center empty-list-some">
      <span className="flx flx-center empty-list-span">{message}</span>
    </div>
  );
}

export { EmptyListSome };