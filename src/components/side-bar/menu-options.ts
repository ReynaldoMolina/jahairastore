import { url } from 'inspector';
import {
  BookOpen,
  ChartNoAxesCombined,
  Coins,
  ListChecks,
  Package,
  Shapes,
  ShoppingBag,
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
    name: 'Ventas',
    url: '/ventas',
    icon: Coins,
  },
  {
    name: 'Inventario',
    url: '/inventario',
    icon: Package,
    items: [
      {
        name: 'Ajustes',
        url: '/ajuste-inventario',
      },
      {
        name: 'Traslados',
        url: '/traslados',
      },
      {
        name: 'Categorías',
        url: '/categorias',
      },
    ],
  },
  {
    name: 'Compras',
    url: '/compras',
    icon: Package,
    items: [
      {
        name: 'Gastos',
        url: '/gastos',
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
      },
    ],
  },
  {
    name: 'Clientes',
    url: '/clientes',
    icon: User,
  },
  {
    name: 'Proveedores',
    url: '/proveedores',
    icon: Users,
  },
  {
    name: 'Documentación',
    url: '/documentacion',
    icon: BookOpen,
  },
  // {
  //   name: 'Tareas',
  //   url: '/tareas?state=true',
  //   icon: ListChecks,
  // },
];

export type MenuOption = (typeof menuOptions)[number];
export type MenuSubOption = {
  name: string;
  url: string;
};
