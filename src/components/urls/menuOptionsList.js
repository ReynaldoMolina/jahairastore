export const baseUrl = 'https://jahairastore-api.vercel.app/api/v1/';
// export const baseUrl = 'http://localhost:3001/api/v1/';

// para testear desde el telefono
// export const baseUrl = 'http://192.168.1.7:3001/api/v1/';

export const menuOptionsList = [
  {
    id: 0,
    name: "Home",
    divider: true
  },
  {
    id: 1,
    name: "Clientes",
    url: 'clients',
    divider: false
  },
  {
    id: 2,
    name: "Pedidos",
    url: 'orders',
    divider: false
  },
  {
    id: 3,
    name: "Recibos",
    url: 'sales',
    divider: true
  },
  {
    id: 4,
    name: "Proveedores",
    url: 'providers',
    divider: false
  },
  // {
  //   id: 5,
  //   name: "Compras",
  //   url: 'purchases',
  //   divider: false
  // },
  // {
  //   id: 6,
  //   name: "Gastos",
  //   url: 'expenses',
  //   divider: true
  // },
  {
    id: 7,
    name: "Productos",
    url: 'products',
    divider: false
  },
  {
    id: 8,
    name: "Categorías",
    url: 'categories',
    divider: true
  },
  // {
  //   id: 9,
  //   name: "Finanzas",
  //   url: 'finances',
  //   divider: true
  // },
  {
    id: 10,
    name: "Productos página",
    url: 'productspage',
    divider: false
  },
];
