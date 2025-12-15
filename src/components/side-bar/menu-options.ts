import {
  BanknoteArrowDown,
  ChartNoAxesCombined,
  ClipboardList,
  Coins,
  // Home,
  Package,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react';

export const menuOptions = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: ChartNoAxesCombined,
  },
  {
    name: 'Ventas',
    url: '/ventas',
    icon: Coins,
  },
  {
    name: 'Productos',
    url: '/productos',
    icon: Package,
  },
  {
    name: 'Pedidos',
    url: '/pedidos',
    icon: ShoppingBag,
  },
  {
    name: 'Recibos',
    url: '/recibos',
    icon: Receipt,
  },
  {
    name: 'Clientes',
    url: '/clientes',
    icon: User,
  },
  {
    name: 'Compras',
    url: '/compras',
    icon: ShoppingCart,
  },
  {
    name: 'Gastos',
    url: '/gastos',
    icon: BanknoteArrowDown,
  },
  {
    name: 'Proveedores',
    url: '/proveedores',
    icon: Users,
  },
  {
    name: 'Tareas',
    url: '/tareas',
    icon: ClipboardList,
  },
];

export type MenuOption = (typeof menuOptions)[number];
