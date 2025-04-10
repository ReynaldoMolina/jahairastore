export const apiUrl = 'https://jahairastore-api.vercel.app/api/';
export const baseUrl = 'https://jahairastore-api.vercel.app/api/v1/';
// export const baseUrl = 'http://localhost:3001/api/v1/';
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
    url: baseUrl + 'clients/',
    divider: false
  },
  {
    id: 2,
    name: "Pedidos",
    url: baseUrl + 'orders',
    divider: false
  },
  {
    id: 3,
    name: "Recibos",
    url: baseUrl + 'sales',
    divider: true
  },
  {
    id: 4,
    name: "Proveedores",
    url: baseUrl + 'providers/',
    divider: false
  },
  // {
  //   id: 5,
  //   name: "Compras",
  //   url: baseUrl + 'purchases/',
  //   divider: false
  // },
  // {
  //   id: 6,
  //   name: "Gastos",
  //   url: baseUrl + 'expenses/',
  //   divider: true
  // },
  {
    id: 7,
    name: "Productos",
    url: baseUrl + 'products/',
    divider: false
  },
  {
    id: 8,
    name: "Categorías",
    url: baseUrl + 'categories/',
    divider: true
  },
  // {
  //   id: 9,
  //   name: "Finanzas",
  //   url: baseUrl + 'finances/',
  //   divider: true
  // },
  {
    id: 10,
    name: "Productos página",
    url: baseUrl + 'productspage/',
    divider: false
  },
];
