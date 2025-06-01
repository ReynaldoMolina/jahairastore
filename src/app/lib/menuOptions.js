import getDate from "./getDate";

const currentDate = getDate();

export const menuOptions = [
  {
    id: 0,
    name: "Home",
    path: '/',
    url: '/',
    divider: true
  },
  {
    id: 1,
    name: "Clientes",
    path: '/clients',
    url: '/clients',
    divider: false
  },
  {
    id: 2,
    name: "Pedidos",
    path: '/orders',
    url: '/orders?query=debe',
    divider: false
  },
  {
    id: 3,
    name: "Recibos",
    path: '/receipts',
    url: `/receipts?query=${currentDate}`,
    divider: true
  },
  {
    id: 4,
    name: "Productos",
    path: '/products',
    url: `/products?query=${currentDate}`,
    divider: false
  },
  {
    id: 5,
    name: "Proveedores",
    path: '/providers',
    url: '/providers',
    divider: false
  },
  {
    id: 6,
    name: "Categorías",
    path: '/categories',
    url: '/categories',
    divider: true
  },
  {
    id: 7,
    name: "Website",
    path: '/website',
    url: '/website',
    divider: false
  },
];