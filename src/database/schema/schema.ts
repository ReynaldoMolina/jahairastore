import {
  pgTable,
  serial,
  text,
  integer,
  date,
  doublePrecision,
  boolean,
} from 'drizzle-orm/pg-core';

export const cliente = pgTable('cliente', {
  id: serial('id').primaryKey().notNull(),
  nombre: text('nombre').notNull(),
  apellido: text('apellido').notNull(),
  telefono: text('telefono'),
  direccion: text('direccion'),
});

export const compra = pgTable('compra', {
  id: serial('id').primaryKey().notNull(),
  idProveedor: integer('id_proveedor').notNull(),
  fecha: date('fecha').notNull(),
  idUbicacion: integer('id_ubicacion')
    .notNull()
    .default(1)
    .references(() => ubicacion.id),
});

export const compraDetalle = pgTable('compra_detalle', {
  id: serial('id').primaryKey().notNull(),
  idCompra: integer('id_compra').notNull(),
  idProducto: integer('id_producto').notNull(),
  precioCompra: doublePrecision('precio_compra').notNull(),
  precioVenta: doublePrecision('precio_venta').notNull(),
  cantidad: integer('cantidad').notNull(),
  cambioDolar: doublePrecision('cambio_dolar').notNull(),
});

export const ajustes = pgTable('ajustes', {
  id: serial('id').primaryKey().notNull(),
  nombreEmpresa: text('nombre_empresa').notNull(),
  eslogan: text('eslogan').notNull(),
  cambioDolar: doublePrecision('cambio_dolar'),
  envioMaritimo: doublePrecision('envio_maritimo'),
  envioAereo: doublePrecision('envio_aereo'),
});

export const gasto = pgTable('gasto', {
  id: serial('id').primaryKey().notNull(),
  idCompra: integer('id_compra').notNull(),
  idProveedor: integer('id_proveedor').notNull(),
  fecha: date('fecha').notNull(),
  gasto: doublePrecision('gasto').notNull(),
  concepto: text('concepto').notNull(),
  cambioDolar: doublePrecision('cambio_dolar').notNull(),
  enCordobas: boolean('en_cordobas').notNull().default(false),
  anulado: boolean('anulado').notNull().default(false),
});

export const pedido = pgTable('pedido', {
  id: serial('id').primaryKey().notNull(),
  idCliente: integer('id_cliente').notNull(),
  fecha: date('fecha').notNull(),
  peso: doublePrecision('Peso'),
  cambioDolar: doublePrecision('cambio_dolar'),
  precioLibra: doublePrecision('precio_libra'),
  tipoEnvio: text('tipo_envio'),
});

export const pedidoDetalle = pgTable('pedido_detalle', {
  id: serial('id').primaryKey().notNull(),
  idPedido: integer('id_pedido').notNull(),
  nombreProducto: text('nombre_producto'),
  precioVenta: doublePrecision('precio_venta').notNull(),
  precioCompra: doublePrecision('precio_compra').notNull(),
  cantidad: integer('cantidad').notNull(),
  imagenUrl: text('imagen_url'),
});

export const proveedor = pgTable('proveedor', {
  id: serial('id').primaryKey().notNull(),
  nombreEmpresa: text('nombre_empresa').notNull(),
  telefono: text('telefono'),
  direccion: text('direccion'),
});

export const recibo = pgTable('recibo', {
  id: serial('id').primaryKey().notNull(),
  idPedido: integer('id_pedido').notNull(),
  idCliente: integer('id_cliente').notNull(),
  fecha: date('fecha').notNull(),
  abono: doublePrecision('abono').notNull(),
  saldo: doublePrecision('saldo').notNull(),
  concepto: text('concepto'),
  cambioDolar: doublePrecision('cambio_dolar').notNull().default(37),
  enCordobas: boolean('en_cordobas').notNull().default(false),
  anulado: boolean('anulado').notNull().default(false),
});

export const venta = pgTable('venta', {
  id: serial('id').primaryKey().notNull(),
  idCliente: integer('id_cliente').notNull(),
  fecha: date('fecha').notNull(),
  abono: doublePrecision('abono').notNull(),
  credito: boolean('credito').notNull(),
  cambioDolar: doublePrecision('cambio_dolar'),
  idUbicacion: integer('id_ubicacion')
    .notNull()
    .default(1)
    .references(() => ubicacion.id),
});

export const ventaDetalle = pgTable('venta_detalle', {
  id: serial('id').primaryKey().notNull(),
  idVenta: integer('id_venta').notNull(),
  idProducto: integer('id_producto').notNull(),
  precioVenta: doublePrecision('precio_venta').notNull(),
  precioVentaPorMayor: doublePrecision('precio_venta_por_mayor')
    .notNull()
    .default(0),
  precioCompra: doublePrecision('precio_compra').notNull(),
  cantidad: integer('cantidad').notNull(),
  cambioDolar: doublePrecision('cambio_dolar').notNull(),
  precioPorMayor: boolean('precio_por_mayor').notNull().default(false),
});

export const producto = pgTable('producto', {
  id: serial('id').primaryKey().notNull(),
  idProveedor: integer('id_proveedor'),
  nombre: text('nombre').notNull(),
  imagenUrl: text('imagen_url'),
  descripcion: text('descripcion'),
  precioCompra: doublePrecision('precio_compra').notNull(),
  precioVenta: doublePrecision('precio_venta').notNull(),
  precioVentaPorMayor: doublePrecision('precio_venta_por_mayor'),
  fecha: date('fecha').notNull(),
  codigo: text('codigo'),
  precioEnCordobas: boolean('precio_en_cordobas').notNull().default(false),
  cambioDolar: doublePrecision('cambio_dolar'),
});

export const productoTraslado = pgTable('producto_traslado', {
  id: serial('id').primaryKey().notNull(),
  fecha: date('fecha').notNull(),
  idUbicacionOrigen: integer('id_ubicacion_origen')
    .notNull()
    .references(() => ubicacion.id),
  idUbicacionDestino: integer('id_ubicacion_destino')
    .notNull()
    .references(() => ubicacion.id),
});

export const productoTrasladoDetalle = pgTable('producto_traslado_detalle', {
  id: serial('id').primaryKey().notNull(),
  idTraslado: integer('id_traslado')
    .notNull()
    .references(() => productoTraslado.id),
  idProducto: integer('id_producto').notNull(),
  cantidad: integer('cantidad').notNull(),
});

export const productoAjuste = pgTable('producto_ajuste', {
  id: serial('id').primaryKey().notNull(),
  fecha: date('fecha').notNull(),

  idUbicacion: integer('id_ubicacion')
    .notNull()
    .references(() => ubicacion.id),

  motivo: text('motivo'), // opcional: faltante, sobrante, daño, conteo, etc.
});

export const productoAjusteDetalle = pgTable('producto_ajuste_detalle', {
  id: serial('id').primaryKey().notNull(),

  idAjuste: integer('id_ajuste')
    .notNull()
    .references(() => productoAjuste.id),

  idProducto: integer('id_producto').notNull(),

  /**
   * IMPORTANTE:
   * +cantidad = entra stock
   * -cantidad = sale stock
   */
  cantidad: integer('cantidad').notNull(),
});

export const ubicacion = pgTable('ubicacion', {
  id: serial('id').primaryKey().notNull(),
  nombre: text('nombre').notNull(),
});

export const tarea = pgTable('tarea', {
  id: serial('id').primaryKey().notNull(),
  tarea: text('tarea').notNull(),
  fecha_entrega: date('fecha_entrega').notNull(),
  estado: text('estado').notNull(),
});

export const url = pgTable('url', {
  id: text().primaryKey().notNull(),
  url: text(),
});
