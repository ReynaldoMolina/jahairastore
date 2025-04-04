import React from "react";
import { MenuContext } from "../Context/MenuContext";

import { Categories } from "../Categories";
import { Clients } from "../Clients";
import { Orders } from "../Orders";
import { Receipts } from "../Receipts";
import { Providers } from "../Providers";
import { Products } from "../Products";
import { ProductsPage } from "../ProductsPage";

const components = {
  "Categorías": () => <Categories />,
  "Clientes": () => <Clients />,
  "Pedidos": () => <Orders />,
  "Productos": () => <Products />,
  "Proveedores": () => <Providers />,
  "Ventas": () => <Receipts />,
  "Productos página": () => <ProductsPage />,
};

function DataContent() {
  console.log('Render DataContent')
  const { menuOption } = React.useContext(MenuContext);

  return (
    <>
      {components[menuOption.name]()}
    </>
  )
}

export { DataContent };