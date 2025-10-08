import {
  pgTable,
  serial,
  text,
  integer,
  date,
  real,
  boolean,
} from 'drizzle-orm/pg-core';

export const cliente = pgTable('cliente', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
  apellido: text().notNull(),
  telefono: text(),
  municipio: text(),
  direccion: text(),
});

export const compra = pgTable('compra', {
  id: serial().primaryKey().notNull(),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedor.id),
  fecha: date().notNull(),
});

export const compra_detalle = pgTable('compra_detalle', {
  id: serial().primaryKey().notNull(),
  id_compra: integer()
    .notNull()
    .references(() => compra.id),
  id_producto: integer()
    .notNull()
    .references(() => producto.id),
  cantidad: integer().notNull(),
  precio: real().notNull(),
  cambio_dolar: real().notNull(),
  precio_en_cordobas: boolean().notNull(),
});

export const negocio = pgTable('negocio', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
  eslogan: text().notNull(),
  mensaje: text(),
});

export const ajustes = pgTable('ajustes', {
  id: serial().primaryKey().notNull(),
  id_negocio: integer()
    .notNull()
    .references(() => negocio.id),
  cambio_dolar: real().notNull(),
  envio_aereo: real().notNull(),
  envio_mar: real().notNull(),
});

export const gasto = pgTable('gasto', {
  id: serial().primaryKey().notNull(),
  id_compra: integer()
    .notNull()
    .references(() => compra.id),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedor.id),
  fecha: date().notNull(),
  monto: real().notNull(),
  cambio_dolar: real().notNull(),
  concepto: text(),
});

export const pedido = pgTable('pedido', {
  id: serial().primaryKey().notNull(),
  id_cliente: integer()
    .notNull()
    .references(() => cliente.id),
  fecha: date().notNull(),
  peso_libra: real(),
  cambio_dolar: real(),
  precio_libra: real(),
  tipo_envio: text().notNull(),
});

export const pedido_detalle = pgTable('pedido_detalle', {
  id: serial().primaryKey().notNull(),
  id_pedido: integer()
    .notNull()
    .references(() => pedido.id),
  id_producto: integer()
    .notNull()
    .references(() => producto.id),
  precio_venta: real().notNull(),
  precio_compra: real().notNull(),
  cantidad: integer().notNull(),
});

export const proveedor = pgTable('proveedor', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
  telefono: text(),
  municipio: text(),
  direccion: text(),
});

export const recibo = pgTable('recibo', {
  id: serial().primaryKey().notNull(),
  id_pedido: integer()
    .notNull()
    .references(() => pedido.id),
  fecha: date().notNull(),
  abono: real().notNull(),
  saldo: real().notNull(),
  concepto: text(),
});

export const usuario = pgTable('usuario', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
  password: text(),
  image: text(),
  rol: text(),
});

export const venta = pgTable('venta', {
  id: serial().primaryKey().notNull(),
  id_cliente: integer()
    .notNull()
    .references(() => cliente.id),
  fecha: date().notNull(),
  abono: real().notNull(),
  saldo: real(),
  tipo_venta: text().notNull(),
});

export const venta_detalle = pgTable('venta_detalle', {
  id: serial().primaryKey().notNull(),
  id_venta: integer()
    .notNull()
    .references(() => venta.id),
  id_producto: integer()
    .notNull()
    .references(() => producto.id),
  precio_venta: real().notNull(),
  precio_compra: real().notNull(),
  cantidad: integer().notNull(),
  cambio_dolar: real().notNull(),
});

export const categoria = pgTable('categoria', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
});

export const municipio = pgTable('municipio', {
  id: serial().primaryKey().notNull(),
  nombre: text().notNull(),
});

export const producto = pgTable('producto', {
  id: serial().primaryKey().notNull(),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedor.id),
  nombre: text().notNull(),
  precio_compra: real(),
  precio_venta: real(),
  cambio_dolar: real(),
  inventario: boolean().notNull(),
  precio_en_cordobas: boolean().notNull(),
  id_categoria: integer()
    .notNull()
    .references(() => categoria.id),
  id_externo: text(),
});
