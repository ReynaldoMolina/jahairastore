import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  date,
  doublePrecision,
  boolean,
  foreignKey,
} from 'drizzle-orm/pg-core';

export const clientes = pgTable('Clientes', {
  id: serial('Id').primaryKey().notNull(),
  nombre: varchar('Nombre', { length: 255 }).notNull(),
  apellido: varchar('Apellido', { length: 255 }).notNull(),
  telefono: text('Telefono'),
  municipio: text('Municipio'),
  departamento: text('Departamento'),
  pais: text('Pais'),
  direccion: text('Direccion'),
  idUsuario: integer('Id_usuario'),
});

export const compras = pgTable('Compras', {
  id: serial('Id').primaryKey().notNull(),
  idProveedor: integer('Id_proveedor').notNull(),
  fecha: date('Fecha').notNull(),
});

export const comprasDetalles = pgTable('ComprasDetalles', {
  id: serial('Id').primaryKey().notNull(),
  idCompra: integer('Id_compra').notNull(),
  idProducto: integer('Id_producto').notNull(),
  precioCompra: doublePrecision('Precio_compra').notNull(),
  cantidad: integer('Cantidad').notNull(),
  precioVenta: doublePrecision('Precio_venta').notNull(),
  cambioDolar: doublePrecision('Cambio_dolar').notNull(),
});

export const configuracion = pgTable('Configuracion', {
  id: serial('Id').primaryKey().notNull(),
  nombreEmpresa: text('Nombre_empresa').notNull(),
  eslogan: text('Eslogan').notNull(),
  mensaje: text('Mensaje'),
  porHacer: text('Por_hacer'),
  cambioDolar: doublePrecision('Cambio_dolar'),
  envioMaritimo: doublePrecision('Envio_maritimo'),
  envioAereo: doublePrecision('Envio_aereo'),
});

export const egresos = pgTable('Egresos', {
  id: serial('Id').primaryKey().notNull(),
  idCompra: integer('Id_compra').notNull(),
  idProveedor: integer('Id_proveedor').notNull(),
  fecha: date('Fecha').notNull(),
  gasto: doublePrecision('Gasto').notNull(),
  concepto: varchar('Concepto', { length: 255 }).notNull(),
  cambioDolar: doublePrecision('Cambio_dolar').notNull(),
});

export const pedidos = pgTable('Pedidos', {
  id: serial('Id').primaryKey().notNull(),
  idCliente: integer('Id_cliente').notNull(),
  fecha: date('Fecha').notNull(),
  peso: doublePrecision('Peso'),
  cambioDolar: doublePrecision('Cambio_dolar'),
  precioLibra: doublePrecision('Precio_libra'),
  tipoEnvio: text('Tipo_envio'),
});

export const pedidosDetalles = pgTable('PedidosDetalles', {
  id: serial('Id').primaryKey().notNull(),
  idPedido: integer('Id_pedido').notNull(),
  // idProducto: integer('Id_producto').notNull(),
  nombreProducto: text('Nombre_producto'),
  precioVenta: doublePrecision('Precio_venta').notNull(),
  precioCompra: doublePrecision('Precio_compra').notNull(),
  cantidad: integer('Cantidad').notNull(),
});

export const proveedores = pgTable('Proveedores', {
  id: serial('Id').primaryKey().notNull(),
  nombreEmpresa: varchar('Nombre_empresa', { length: 255 }).notNull(),
  nombreContacto: varchar('Nombre_contacto', { length: 255 }),
  telefono: varchar('Telefono', { length: 255 }),
  departamento: varchar('Departamento', { length: 255 }),
  municipio: varchar('Municipio', { length: 255 }),
  pais: varchar('Pais', { length: 255 }),
  direccion: varchar('Direccion', { length: 255 }),
});

export const recibos = pgTable('Recibos', {
  id: serial('Id').primaryKey().notNull(),
  idPedido: integer('Id_pedido').notNull(),
  idCliente: integer('Id_cliente').notNull(),
  fecha: date('Fecha').notNull(),
  abono: doublePrecision('Abono').notNull(),
  saldo: doublePrecision('Saldo').notNull(),
  concepto: text('Concepto'),
});

export const usuarios = pgTable('Usuarios', {
  idUsuario: serial('Id_usuario').primaryKey().notNull(),
  nombreUsuario: text('Nombre_usuario').notNull(),
  password: text('Password'),
  fotoUrl: text('Foto_url'),
  rol: text('Rol'),
});

export const ventas = pgTable('Ventas', {
  id: serial('Id').primaryKey().notNull(),
  idCliente: integer('Id_cliente').notNull(),
  fecha: date('Fecha').notNull(),
  abono: doublePrecision('Abono').notNull(),
  credito: boolean('Credito').notNull(),
  saldo: doublePrecision('Saldo'),
  cambioDolar: doublePrecision('Cambio_dolar'),
});

export const ventasDetalles = pgTable('VentasDetalles', {
  id: serial('Id').primaryKey().notNull(),
  idProducto: integer('Id_producto').notNull(),
  precioVenta: doublePrecision('Precio_venta').notNull(),
  precioCompra: doublePrecision('Precio_compra').notNull(),
  cantidad: integer('Cantidad').notNull(),
  cambioDolar: doublePrecision('Cambio_dolar').notNull(),
  idVenta: integer('Id_venta').notNull(),
});

export const categorias = pgTable('Categorias', {
  id: serial('Id').primaryKey().notNull(),
  nombre: varchar('Nombre', { length: 255 }).notNull(),
});

export const productos = pgTable(
  'Productos',
  {
    id: serial('Id').primaryKey().notNull(),
    idProveedor: integer('Id_proveedor'),
    nombre: text('Nombre').notNull(),
    descripcion: text('Descripcion'),
    precioCompra: doublePrecision('Precio_compra').notNull(),
    precioVenta: doublePrecision('Precio_venta').notNull(),
    idCategoria: integer('Id_categoria'),
    fecha: date('Fecha').notNull(),
    idShein: text('Id_shein'),
    inventario: boolean('Inventario').notNull(),
    precioEnCordobas: boolean('Precio_en_cordobas').notNull().default(false),
    cambioDolar: doublePrecision('Cambio_dolar'),
  },
  (table) => [
    foreignKey({
      columns: [table.idCategoria],
      foreignColumns: [categorias.id],
      name: 'Productos_Id_categoria_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ]
);

// only in demo mode
// export const urls = pgTable('Urls', {
//   id: text().primaryKey().notNull(),
//   url: text(),
// });
