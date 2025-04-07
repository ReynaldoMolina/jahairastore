import React from "react";
import "./EmptyListSome.css";

function EmptyListSome() {
  return (
    <div className="flx flx-col flx-center empty-list-some">
      <span className="flx flx-center empty-list-span">Solo se cargaron datos agregados hoy, da click al ícono de filtro para cargar todo</span>
    </div>
  );
}

export { EmptyListSome };