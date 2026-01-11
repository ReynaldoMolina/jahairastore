import {
  BanknoteArrowDown,
  BookText,
  ChartNoAxesCombined,
  ClipboardList,
  Coins,
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
    url: '/',
    icon: ChartNoAxesCombined,
  },
  {
    name: 'Productos',
    url: '/productos',
    icon: Package,
    items: [
      {
        name: 'Ventas',
        url: '/ventas',
        icon: Coins,
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
    ],
  },
  {
    name: 'Pedidos',
    url: '/pedidos',
    icon: ShoppingBag,
    items: [
      {
        name: 'Recibos',
        url: '/recibos',
        icon: Receipt,
      },
    ],
  },
  {
    name: 'Clientes',
    url: '/clientes',
    icon: User,
  },
  {
    name: 'Documentación',
    url: '/documentacion',
    icon: BookText,
  },
  {
    name: 'Tareas',
    url: '/tareas?state=true',
    icon: ClipboardList,
  },
];

export type MenuOption = (typeof menuOptions)[number];
