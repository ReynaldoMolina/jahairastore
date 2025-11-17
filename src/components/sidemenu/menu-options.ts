import {
  BanknoteArrowDown,
  ChartNoAxesCombined,
  Coins,
  Home,
  Package,
  Receipt,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
  Warehouse,
} from 'lucide-react';

export const menuOptions = [
  {
    name: 'Inicio',
    url: '/',
    divider: false,
    icon: Home,
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    divider: true,
    icon: ChartNoAxesCombined,
  },
  {
    name: 'Ventas',
    url: '/ventas',
    divider: false,
    icon: Coins,
  },
  {
    name: 'Productos',
    url: '/productos',
    divider: true,
    icon: Package,
  },
  {
    name: 'Pedidos',
    url: '/pedidos',
    divider: false,
    icon: ShoppingBag,
  },
  {
    name: 'Recibos',
    url: '/recibos',
    divider: false,
    icon: Receipt,
  },
  {
    name: 'Clientes',
    url: '/clientes',
    divider: true,
    icon: User,
  },
  {
    name: 'Compras',
    url: '/compras',
    divider: false,
    icon: ShoppingCart,
  },
  {
    name: 'Gastos',
    url: '/gastos',
    divider: false,
    icon: BanknoteArrowDown,
  },
  {
    name: 'Proveedores',
    url: '/proveedores',
    divider: true,
    icon: Users,
  },
  {
    name: 'Ajustes',
    url: '/ajustes',
    divider: false,
    icon: Settings,
  },
];
