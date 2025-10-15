import {
  BanknoteArrowDown,
  ChartNoAxesCombined,
  Coins,
  House,
  Package,
  Receipt,
  Settings,
  Shapes,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
  Warehouse,
} from 'lucide-react';

const style = 'size-5';

const icons = {
  Categorías: <Shapes className={style} />,
  Clientes: <User className={style} />,
  Inicio: <House className={style} />,
  Pedidos: <ShoppingBag className={style} />,
  Productos: <Package className={style} />,
  Proveedores: <Users className={style} />,
  Compras: <ShoppingCart className={style} />,
  Recibos: <Receipt className={style} />,
  Gastos: <BanknoteArrowDown className={style} />,
  Ventas: <Coins className={style} />,
  Inventario: <Warehouse className={style} />,
  Ajustes: <Settings className={style} />,
  Informes: <ChartNoAxesCombined className={style} />,
};

export function SideMenuIcon({ name }) {
  return <>{icons[name]}</>;
}
