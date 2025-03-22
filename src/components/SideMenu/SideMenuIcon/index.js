import React from "react";
import "./SideMenuIcon.css";
import { ReactComponent as SvgCategories } from "./categories.svg";
import { ReactComponent as SvgClients } from "./clients.svg";
import { ReactComponent as SvgExpenses } from "./expenses.svg";
import { ReactComponent as SvgFinances } from "./finances.svg";
import { ReactComponent as SvgHome } from "./home.svg";
import { ReactComponent as SvgLogout } from "./logout.svg";
import { ReactComponent as SvgOrders } from "./orders.svg";
import { ReactComponent as SvgProducts } from "./products.svg";
import { ReactComponent as SvgProviders } from "./providers.svg";
import { ReactComponent as SvgPurchases } from "./purchases.svg";
import { ReactComponent as SvgReceipts } from "./receipts.svg";
import { ReactComponent as SvgSettings } from "./settings.svg";

const styleFill = "side-menu-opt-icon icon-fill";
const styleStroke = "side-menu-opt-icon icon-stroke";

const icons = {
  "Categorías": () => <SvgCategories className={styleFill}/>,
  "Clientes": () => <SvgClients className={styleStroke}/>,
  "Gastos": () => <SvgExpenses className={styleFill}/>,
  "Finanzas": () => <SvgFinances className={styleFill}/>,
  "Home": () => <SvgHome className={styleStroke}/>,
  "Cerrar sesión": () => <SvgLogout className={styleStroke}/>,
  "Pedidos": () => <SvgOrders className={styleStroke}/>,
  "Productos": () => <SvgProducts className={styleStroke}/>,
  "Proveedores": () => <SvgProviders className={styleFill}/>,
  "Compras": () => <SvgPurchases className={styleFill}/>,
  "Ventas": () => <SvgReceipts className={styleStroke}/>,
  "Configuración": () => <SvgSettings className={styleStroke}/>,
};

function SideMenuIcon({ name }) {
  return (
    <>
      {icons[name]()}
    </>
  )
}

export { SideMenuIcon };