import { pgTable, serial, text, integer, date, real, boolean } from "drizzle-orm/pg-core"

export const clientes = pgTable("clientes", {
	id: serial().primaryKey().notNull(),
	nombre: text().notNull(),
	apellido: text().notNull(),
	telefono: text(),
	municipio: text(),
	departamento: text(),
	pais: text(),
	direccion: text(),
	id_usuario: integer().references(() => usuarios.id),
});

export const compras = pgTable("compras", {
	id: serial().primaryKey().notNull(),
	id_proveedor: integer().notNull().references(() => proveedores.id),
	fecha: date().notNull(),
});

export const compras_detalles = pgTable("compras_detalles", {
	id: serial().primaryKey().notNull(),
	id_compra: integer().notNull().references(() => compras.id),
	id_producto: integer().notNull().references(() => productos.id),
	precio_compra: real().notNull(),
	cantidad: integer().notNull(),
	precio_venta: real().notNull(),
	cambio_dolar: real().notNull(),
});

export const configuracion = pgTable("configuracion", {
	id: serial().primaryKey().notNull(),
	nombre_empresa: text().notNull(),
	eslogan: text().notNull(),
	mensaje: text(),
});

export const egresos = pgTable("egresos", {
	id: serial().primaryKey().notNull(),
	id_compra: integer().notNull().references(() => compras.id),
	id_proveedor: integer().notNull().references(() => proveedores.id),
	fecha: date().notNull(),
	gasto: real().notNull(),
	concepto: text().notNull(),
	cambio_dolar: real().notNull(),
});

export const pedidos = pgTable("pedidos", {
	id: serial().primaryKey().notNull(),
	id_cliente: integer().notNull().references(() => clientes.id),
	fecha: date().notNull(),
	peso: real(),
	cambio_dolar: real(),
	precio_libra: real(),
});

export const pedidosDetalles = pgTable("pedidos_detalle", {
	id: serial().primaryKey().notNull(),
	id_pedido: integer().notNull().references(() => pedidos.id),
	id_producto: integer().notNull().references(() => productos.id),
	precio_venta: real().notNull(),
	precio_compra: real().notNull(),
	cantidad: integer().notNull(),
});

export const proveedores = pgTable("proveedores", {
	id: serial().primaryKey().notNull(),
	nombre_empresa: text().notNull(),
	nombre_contacto: text(),
	telefono: text(),
	departamento: text(),
	municipio: text(),
	pais: text(),
	direccion: text(),
});

export const recibos = pgTable("recibos", {
	id: serial().primaryKey().notNull(),
	id_pedido: integer().notNull().references(() => pedidos.id),
	id_cliente: integer().notNull().references(() => clientes.id),
	fecha: date().notNull(),
	abono: real().notNull(),
	saldo: real().notNull(),
	concepto: text(),
});

export const usuarios = pgTable("usuarios", {
	id: serial().primaryKey().notNull(),
	nombre_usuario: text().notNull(),
	password: text(),
	foto_url: text(),
	rol: text(),
});

export const ventas = pgTable("ventas", {
	id: serial().primaryKey().notNull(),
	id_cliente: integer().notNull().references(() => clientes.id),
	fecha: date().notNull(),
	abono: real().notNull(),
	credito: boolean().notNull(),
	saldo: real(),
});

export const ventasDetalles = pgTable("ventas_detalle", {
	id: serial().primaryKey().notNull(),
	id_venta: integer().notNull().references(() => ventas.id),
	id_producto: integer().notNull().references(() => productos.id),
	precio_venta: real().notNull(),
	precio_compra: real().notNull(),
	cantidad: integer().notNull(),
	cambio_colar: real().notNull(),
});

export const categorias = pgTable("categorias", {
	id: serial().primaryKey().notNull(),
	nombre: text().notNull(),
});

export const productos = pgTable("productos", {
	id: serial().primaryKey().notNull(),
	id_proveedor: integer().notNull().references(() => proveedores.id),
	nombre: text().notNull(),
	descripcion: text(),
	precio_compra: real().notNull(),
	precio_venta: real().notNull(),
	id_categoria: integer().notNull().references(() => categorias.id),
	fecha: date().notNull(),
	id_shein: text(),
	inventario: boolean().notNull(),
	cambio_dolar: real(),
})
