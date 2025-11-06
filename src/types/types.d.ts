export interface SearchParamsProps {
  start: string;
  end: string;
  page: string;
}

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export interface SelectOptions {
  value: string;
  label: string;
}

export interface SaleTable {
  id: number;
  nombreCliente: string;
  abono: number;
  fecha: string;
  totalVenta: number;
  totalCompra: number;
  saldo: number;
}

export interface SaleById {
  nombreEmpresa: string;
  eslogan: string;
  id: number;
  idCliente: number;
  nombreCliente: string;
  apellidoCliente: string;
  fecha: string;
  abono: number;
  credito: boolean;
  saldo: number;
  cambioDolar: number;
  detail: {
    id: number;
    idProducto: number;
    nombre: string;
    precioVenta: number;
    precioCompra: number;
    cantidad: number;
    cambioDolar: number;
    idVenta: number;
  }[];
}

export interface SaleFormType {
  id?: number;
  idCliente: number;
  fecha: string;
  abono: number;
  credito: boolean;
  saldo: number | null;
  cambioDolar: number;
}

export interface SaleDetailType {
  id?: number;
  idProducto: number;
  nombre?: string;
  precioVenta: number;
  precioCompra: number;
  cantidad: number;
  cambioDolar: number;
  idVenta: number;
}

export interface ProductFormType {
  id?: number;
  idProveedor?: number | null;
  nombre: string;
  precioEnCordobas: boolean;
  cambioDolar: number;
  precioCompra: number;
  precioVenta: number;
  descripcion?: string | null;
  idCategoria?: number | null;
  fecha: string;
  idShein?: string | null;
  inventario: boolean;
  precioEnCordobas: boolean;
}

export interface ProductSearchProduct {
  id: number;
  nombre: string;
  idShein: string;
  precioCompra: number;
  precioVenta: number;
  cambioDolar: number;
  existencias: number;
}

export interface ProductSearchData {
  products: ProductSearchProduct[];
  query: string;
  totalPages: number;
}

export interface SettingsFormType {
  nombreEmpresa: string;
  eslogan: string;
  mensaje: string | null;
  porHacer: string | null;
}

export interface ServerStatus {
  success: boolean | undefined;
  title: string;
  description?: string;
  returningId?: string | number;
}

export interface SearchParamsProps {
  query?: string;
  orderBy?: string;
  limit?: string;
  state?: string;
  direction?: SortOrder;
}

export interface LoginFormType {
  username: string;
  password: string;
}
