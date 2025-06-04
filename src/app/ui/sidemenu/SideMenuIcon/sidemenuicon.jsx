import Categories from "./categories.svg";
import Clients from "./clients.svg";
import Home from "./home.svg";
import Orders from "./orders.svg";
import Products from "./products.svg";
import Providers from "./providers.svg";
import Receipts from "./receipts.svg";
import Purchases from "./purchases.svg";
import Website from "./website.svg";

const style = "size-5"

const icons = {
  "Categorías": <Categories className={style}/>,
  "Clientes": <Clients className={style}/>,
  "Home": <Home className={style}/>,
  "Pedidos": <Orders className={style}/>,
  "Productos": <Products className={style}/>,
  "Website": <Website className={style}/>,
  "Proveedores": <Providers className={style}/>,
  "Compras": <Purchases className={style}/>,
  "Recibos": <Receipts className={style}/>,
};

export default function SideMenuIcon({ name }) {
  return (
    <>
      {icons[name]}
    </>
  )
}