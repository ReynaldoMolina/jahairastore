import {
  BookOpen,
  ChartNoAxesCombined,
  ListChecks,
  Package,
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
    name: 'Inventario',
    url: '/inventario?state=true&page=1',
    icon: Package,
    items: [
      {
        name: 'Ventas',
        url: '/ventas',
      },
      {
        name: 'Compras',
        url: '/compras',
      },
      {
        name: 'Gastos',
        url: '/gastos',
      },
      {
        name: 'Traslados',
        url: '/traslados',
      },
      // {
      //   name: 'Ajustes',
      //   url: '/ajustes',
      // },
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
  {
    name: 'Tareas',
    url: '/tareas?state=true',
    icon: ListChecks,
  },
];

export type MenuOption = (typeof menuOptions)[number];
export type MenuSubOption = {
  name: string;
  url: string;
};
