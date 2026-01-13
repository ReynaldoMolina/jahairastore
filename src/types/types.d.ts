export interface SearchParamsProps {
  start: string;
  end: string;
  page: string;
  pedido: string;
  cliente: string;
  saldo: string;
  abono: string;
  compra: string;
  proveedor: string;
  concepto: string;
  ubicacion: string;
}

export interface DashboardData {
  salesCosts: number;
  pedidosTotal: number;
  ordersCosts: number;
  comprasGastos: number;
  comprasInventario: number;
  ordersAbonos: number;
  salesCreditAbonos: number;
  salesContado: number;
  totalOrdersInDollars: number;
  ordersCostsInDollars: number;
}

export interface PageProps {
  params: Promise<{
    id: string;
    id_detalle: string;
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
  telefono: string;
  fecha: string;
  abono: number;
  credito: boolean;
  saldo: number;
  cambioDolar: number;
  idUbicacion: number;
  detail: {
    id: number;
    idVenta: number;
    idProducto: number;
    nombre: string;
    precioVenta: number;
    precioVentaPorMayor: number;
    precioCompra: number;
    cantidad: number;
    cambioDolar: number;
    precioPorMayor: boolean;
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
  idUbicacion: number;
}

export interface SaleDetailType {
  id?: number;
  idProducto: number;
  nombreProducto?: string;
  precioVenta: number;
  precioVentaPorMayor: number;
  precioCompra: number;
  cantidad: number;
  cambioDolar: number;
  idVenta: number;
  existencias?: number;
  precioPorMayor?: boolean;
  precioEnCordobas?: boolean;
}

export interface ProductFormType {
  id?: number;
  idProveedor?: number | null;
  nombre: string;
  precioEnCordobas: boolean;
  cambioDolar: number;
  precioCompra: number;
  precioVenta: number;
  precioVentaPorMayor: number | null;
  descripcion?: string | null;
  fecha: string;
  codigo?: string | null;
  precioEnCordobas: boolean;
  imagenUrl: string | null;
}

export interface ProductSearchProduct {
  id: number;
  nombre: string;
  codigo: string;
  precioCompra: number;
  precioVenta: number;
  precioVentaPorMayor: number;
  cambioDolar: number;
  existencias: number;
  precioEnCordobas: boolean;
}

export interface ProductSearchData {
  products: ProductSearchProduct[];
  query: string;
  totalPages: number;
}

export interface ProductSearchTraslado {
  id: number;
  nombre: string;
  codigo: string;
  existencias: number;
}

export interface ProductSearchTrasladoData {
  products: ProductSearchTraslado[];
  query: string;
  totalPages: number;
}

export interface TrasladoFormType {
  id?: number;
  fecha: string;
  idUbicacionOrigen: number;
  idUbicacionDestino: number;
}

export interface TrasladoById {
  id: number;
  fecha: string;
  idUbicacionOrigen: number;
  idUbicacionDestino: number;
  detail: {
    id: number;
    idTraslado: number;
    idProducto: number;
    nombre: string;
    cantidad: number;
  }[];
}

export interface TrasladoDetailType {
  id?: number;
  idTraslado: number;
  idProducto: number;
  nombreProducto?: string;
  existencias?: number;
  cantidad: number;
}

export interface AjusteInventarioFormType {
  id?: number;
  fecha: string;
  idUbicacion: number;
  motivo: string;
}

export interface AjusteInventarioById {
  id: number;
  fecha: string;
  idUbicacion: number;
  motivo: string;
  detail: {
    id: number;
    idAjuste: number;
    idProducto: number;
    nombre: string;
    cantidad: number;
  }[];
}

export interface AjusteInventarioDetailType {
  id?: number;
  idAjuste: number;
  idProducto: number;
  nombreProducto?: string;
  existencias?: number;
  cantidad: number;
}

export interface OrderFormType {
  id?: number;
  idCliente: number;
  fecha: string;
  peso: number | null;
  cambioDolar: number;
  precioLibra: number | null;
}

export interface OrderById {
  id: number;
  idCliente: number;
  fecha: string;
  nombreCliente: string;
  telefono: string;
  peso: number;
  cambioDolar: number;
  precioLibra: number;
  tipoEnvio: string;
  abonos: number;
  detail: {
    id: number;
    idPedido: number;
    nombreProducto: string;
    precioVenta: number;
    precioCompra: number;
    cantidad: number;
    imagenUrl: string | null;
  }[];
}

export interface OrderDetailType {
  id?: number;
  idPedido: number;
  nombreProducto: string;
  precioVenta: number;
  precioCompra: number;
  cantidad: number;
  imagenUrl: string | null;
}

export interface ReceiptFormType {
  id?: number;
  idPedido: number;
  idCliente: number;
  fecha: string;
  abono: number;
  saldo: number;
  cambioDolar: number;
  enCordobas: boolean;
  concepto: string;
}

export interface ReceiptById {
  id: number;
  idPedido: number;
  idCliente: number;
  nombreCliente: string;
  apellidoCliente: string;
  telefono: string;
  fecha: string;
  saldoInicial: number;
  abono: number;
  saldo: number;
  cambioDolar: number;
  enCordobas: boolean;
  concepto: string;
  anulado: boolean;
}

export interface PurchaseFormType {
  id?: number;
  idProveedor: number;
  idUbicacion: number;
  fecha: string;
}

export interface PurchaseDetailType {
  id?: number;
  idProducto: number;
  nombreProducto?: string;
  precioVenta: number;
  precioCompra: number;
  cantidad: number;
  cambioDolar: number;
  idCompra: number;
  existencias?: number;
  precioEnCordobas?: boolean;
}

export interface PurchaseById {
  id: number;
  idProveedor: number;
  idUbicacion: number;
  nombreEmpresa: string;
  fecha: string;
  gastos: number;
  detail: {
    id: number;
    idCompra: number;
    idProducto: number;
    nombreProducto: string;
    precioVenta: number;
    precioCompra: number;
    cantidad: number;
    cambioDolar: number;
  }[];
}

export interface ExpenseFormType {
  id?: number;
  idCompra: number;
  idProveedor: number;
  fecha: string;
  gasto: number;
  concepto: string;
  cambioDolar: number;
}

export interface ExpenseById {
  id: number;
  idCompra: number;
  idProveedor: number;
  nombreEmpresa: string;
  fecha: string;
  gasto: number;
  concepto: string;
  cambioDolar: number;
  enCordobas: boolean;
  anulado: boolean;
}

export interface ClientById {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string | null;
  direccion: string | null;
}

export interface ProviderById {
  id?: number;
  nombreEmpresa: string;
  telefono: string | null;
  direccion: string | null;
}

export interface TareaById {
  id?: number;
  tarea: string;
  fecha_entrega: string;
  estado: string;
}

export interface BusinessInfoType {
  nombreEmpresa: string;
  eslogan?: string;
  mensaje?: string;
}

export interface AppSettingsFormType {
  nombreEmpresa: string;
  eslogan: string;
  cambioDolar: number | null;
  envioMaritimo: number | null;
  envioAereo: number | null;
}

export interface SettingsCambioDolarType {
  cambioDolar?: number | null;
  envioMaritimo?: number | null;
  envioAereo?: number | null;
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
