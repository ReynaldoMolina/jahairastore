import React from "react";
import { MenuContext } from "../Context/MenuContext";
import { Home } from "../Home";
import { DataContent } from "../DataContent";
import "./MainContent.css";

const components = {
  "Categorías": () => <DataContent />,
  "Clientes": () => <DataContent />,
  "Home": () => <Home />,
  "Pedidos": () => <DataContent />,
  "Productos": () => <DataContent />,
  "Proveedores": () => <DataContent />,
  "Ventas": () => <DataContent />,
};

function MainContent() {
  console.log('Render MainContent')
  const { menuOption } = React.useContext(MenuContext);

  return (
    <>
      <div className="flx flx-col main-content">
        {components[menuOption.name]()}
      </div>
    </>
  )
}

export { MainContent };