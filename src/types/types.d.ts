export type MenuOptionsNames =
  | 'Categorías'
  | 'Clientes'
  | 'Inicio'
  | 'Pedidos'
  | 'Productos'
  | 'Proveedores'
  | 'Compras'
  | 'Recibos'
  | 'Gastos'
  | 'Ventas'
  | 'Inventario'
  | 'Ajustes'
  | 'Informes';

export interface PageProps {
  params: {
    id: string;
  };
  searchParams?: SearchParamsProps;
}

export interface SearchParamsProps {
  search?: string;
  state?: string;
  limit?: string;
  page?: string;
}

export interface GetPagesType {
  search: string;
  filterBySearch: SQL<unknown> | undefined;
  limit: number;
}

export interface BusinessInfoType {
  nombre_empresa: string | null;
  eslogan: string | null;
  mensaje: string | null;
}

export interface MenuOption {
  id: number;
  name: MenuOptionsNames;
  url: string;
  divider: boolean;
}

export interface LoginUserType {
  username: string;
  password: string;
  redirectTo: string;
}

export interface CategoryFormType {
  id?: number;
  categoria: string | null;
}

export interface ClientFormType {
  id?: number;
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
  municipio: string | null;
  direccion: string | null;
}

export type SelectOptions = {
  value: string;
  label: string;
};
