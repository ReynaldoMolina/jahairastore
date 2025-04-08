import React from "react";
import { ReactComponent as SvgCategories } from "./categories.svg";
import { ReactComponent as SvgClients } from "./clients.svg";
import { ReactComponent as SvgHome } from "./home.svg";
import { ReactComponent as SvgOrders } from "./orders.svg";
import { ReactComponent as SvgProducts } from "./products.svg";
import { ReactComponent as SvgProviders } from "./providers.svg";
import { ReactComponent as SvgReceipts } from "./receipts.svg";
import { ReactComponent as SvgSettings } from "./settings.svg";
import "./SideMenuIcon.css";

const styleFill = "side-menu-opt-icon icon-fill";
const styleStroke = "side-menu-opt-icon icon-stroke";

const icons = {
  "Categorías": () => <SvgCategories className={styleFill}/>,
  "Clientes": () => <SvgClients className={styleStroke}/>,
  "Home": () => <SvgHome className={styleStroke}/>,
  "Pedidos": () => <SvgOrders className={styleStroke}/>,
  "Productos": () => <SvgProducts className={styleStroke}/>,
  "Productos página": () => <SvgProducts className={styleStroke}/>,
  "Proveedores": () => <SvgProviders className={styleFill}/>,
  "Recibos": () => <SvgReceipts className={styleStroke}/>,
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