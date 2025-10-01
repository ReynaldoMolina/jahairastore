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

export type ActionType = 'create' | 'edit';

export type FormNounType = 'f' | 'm';

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

export interface ProviderFormType {
  id?: number;
  nombre_empresa: string | null;
  nombre_contacto: string | null;
  telefono: string | null;
  municipio: string | null;
  direccion: string | null;
}

export interface ExpenseFormType {
  id?: number;
  id_compra: number | null;
  id_proveedor: number | null;
  nombre_empresa: string | null;
  fecha: string | null;
  gasto: number | null;
  concepto: string | null;
  cambio_dolar: number | null;
}

export interface PurchaseTableType {
  id?: number;
  nombre_empresa: string | null;
  fecha: string | null;
  total_compra: number | null;
  total_gasto: number | null;
  ganancia: number | null;
}

export interface PurchaseFormType {
  id?: number;
  id_proveedor: number | null;
  fecha: string | null;
}

export interface ProductsTableType {
  id: number;
  nombre: string | null;
  id_externo: string | null;
  precio_venta: number | null;
  precio_compra: number | null;
  ganancia: number | null;
}

export interface ProductsFormType {
  id?: number;
  id_proveedor: number | null;
  nombre: string | null;
  precio_compra: number | null;
  precio_venta: number | null;
  id_categoria: number | null;
  fecha: string | null;
  id_externo: string | null;
  inventario: boolean | null;
}

export type SelectOptions = {
  value: string;
  label: string;
};
