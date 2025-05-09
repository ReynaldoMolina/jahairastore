export const baseUrl = 'https://jahairastore-api.vercel.app/api/v1/';
// export const baseUrl = 'http://localhost:3001/api/v1/';

// para testear desde el telefono
// export const baseUrl = 'http://192.168.1.7:3001/api/v1/';

export const menuOptions = [
  {
    id: 0,
    name: "Home",
    url: '/',
    divider: true
  },
  {
    id: 1,
    name: "Clientes",
    url: '/clients',
    endpoint: 'clients',
    divider: false
  },
  {
    id: 2,
    name: "Pedidos",
    url: '/orders',
    endpoint: 'orders',
    divider: false
  },
  {
    id: 3,
    name: "Recibos",
    url: '/receipts',
    endpoint: 'sales',
    divider: true
  },
  {
    id: 4,
    name: "Proveedores",
    url: '/providers',
    endpoint: 'providers',
    divider: false
  },
  {
    id: 5,
    name: "Productos",
    url: '/products',
    endpoint: 'products',
    divider: false
  },
  {
    id: 6,
    name: "Categorías",
    url: '/categories',
    endpoint: 'categories',
    divider: true
  },
  {
    id: 7,
    name: "Website",
    url: '/website',
    endpoint: 'productspage',
    divider: false
  },
];
