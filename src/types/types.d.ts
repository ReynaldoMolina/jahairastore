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

export interface NegocioFormType {
  nombre: string;
  eslogan: string;
  mensaje: string | null;
}

export interface ConfigType {
  id_negocio: number;
  cambio_dolar: number;
  envio_aereo: number;
  envio_mar: number;
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
  nombre: string;
}

export interface MunicipioType {
  id?: number;
  nombre: string;
}

export interface ClienteTableType {
  id?: number;
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
}

export interface ClienteFormType {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string | null;
  municipio: string | null;
  direccion: string | null;
}

export interface ProveedorTableType {
  id?: number;
  nombre: string | null;
  telefono: string | null;
}

export interface ProveedorFormType {
  id?: number;
  nombre: string;
  telefono: string | null;
  municipio: string | null;
  direccion: string | null;
}

export interface GastoFormType {
  id?: number;
  id_compra: number | null;
  id_proveedor: number | null;
  nombre_empresa: string | null;
  fecha: string | null;
  gasto: number | null;
  concepto: string | null;
  cambio_dolar: number | null;
}

export interface CompraTableType {
  id?: number;
  nombre_empresa: string | null;
  fecha: string | null;
  total_compra: number | null;
  total_gasto: number | null;
  ganancia: number | null;
}

export interface CompraFormType {
  id?: number;
  id_proveedor: number;
  fecha: string;
}

export interface CompraDetalleTable {
  id: number;
  nombre: string | null;
  precio_compra: number | null;
  precio_venta: number | null;
  cantidad: number | null;
  precio_en_cordobas: boolean | null;
}

export interface CompraDetalleType {
  id_compra: number;
  id_producto: number;
  precio_compra: number;
  precio_venta: number;
  cambio_dolar: number;
  precio_en_cordobas: boolean;
  cantidad: number;
}

export interface ProductoTableType {
  id: number;
  nombre_producto: string | null;
  precio_venta: number | null;
  precio_compra: number | null;
  ganancia: number | null;
  precio_en_cordobas: boolean | null;
}

export interface ProductoPurchaseModalTableType {
  id: number;
  nombre_producto: string | null;
  precio_compra: number | null;
  precio_en_cordobas: boolean | null;
}

export interface ProductFormType {
  id?: number;
  id_proveedor: number;
  nombre_producto: string;
  precio_compra: number | null;
  precio_venta: number | null;
  cambio_dolar: number | null;
  id_categoria: number;
  fecha: string;
  id_externo: string | null;
  inventario: boolean;
  precio_en_cordobas: boolean;
}

export type SelectOptions = {
  value: string;
  label: string;
};

export interface FormSelectOptions {
  municipios?: SelectOptions[];
}

export interface ActionsBarDetalleProps<TData> {
  table: Table<TData>;
}
