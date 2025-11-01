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

export interface SaleTable {
  id: number;
  nombreCliente: string;
  abono: number;
  fecha: string;
  totalVenta: number;
  totalCompra: number;
  saldo: number;
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
