-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "Clientes" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Nombre" varchar(255) NOT NULL,
	"Apellido" varchar(255) NOT NULL,
	"Telefono" text,
	"Municipio" text,
	"Departamento" text,
	"Pais" text,
	"Direccion" text,
	"Id_usuario" integer
);
--> statement-breakpoint
CREATE TABLE "Compras" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_proveedor" integer NOT NULL,
	"Fecha" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ComprasDetalles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_compra" integer NOT NULL,
	"Id_producto" integer NOT NULL,
	"Precio_compra" double precision NOT NULL,
	"Cantidad" integer NOT NULL,
	"Precio_venta" double precision NOT NULL,
	"Cambio_dolar" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Configuracion" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Nombre_empresa" text NOT NULL,
	"Eslogan" text NOT NULL,
	"Mensaje" text
);
--> statement-breakpoint
CREATE TABLE "Egresos" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_compra" integer NOT NULL,
	"Id_proveedor" integer NOT NULL,
	"Fecha" date NOT NULL,
	"Gasto" double precision NOT NULL,
	"Concepto" varchar(255) NOT NULL,
	"Cambio_dolar" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Pedidos" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_cliente" integer NOT NULL,
	"Fecha" date NOT NULL,
	"Peso" double precision,
	"Cambio_dolar" double precision,
	"Precio_libra" double precision
);
--> statement-breakpoint
CREATE TABLE "PedidosDetalles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_pedido" integer NOT NULL,
	"Id_producto" integer NOT NULL,
	"Precio_venta" double precision NOT NULL,
	"Precio_compra" double precision NOT NULL,
	"Cantidad" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Proveedores" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Nombre_empresa" varchar(255) NOT NULL,
	"Nombre_contacto" varchar(255),
	"Telefono" varchar(255),
	"Departamento" varchar(255),
	"Municipio" varchar(255),
	"Pais" varchar(255),
	"Direccion" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "Recibos" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_pedido" integer NOT NULL,
	"Id_cliente" integer NOT NULL,
	"Fecha" date NOT NULL,
	"Abono" double precision NOT NULL,
	"Saldo" double precision NOT NULL,
	"Concepto" text
);
--> statement-breakpoint
CREATE TABLE "Usuarios" (
	"Id_usuario" serial PRIMARY KEY NOT NULL,
	"Nombre_usuario" text NOT NULL,
	"Password" text,
	"Foto_url" text,
	"Rol" text
);
--> statement-breakpoint
CREATE TABLE "Ventas" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_cliente" integer NOT NULL,
	"Fecha" date NOT NULL,
	"Abono" double precision NOT NULL,
	"Credito" boolean NOT NULL,
	"Saldo" double precision
);
--> statement-breakpoint
CREATE TABLE "VentasDetalles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_producto" integer NOT NULL,
	"Precio_venta" double precision NOT NULL,
	"Precio_compra" double precision NOT NULL,
	"Cantidad" integer NOT NULL,
	"Cambio_dolar" double precision NOT NULL,
	"Id_venta" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Categorias" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Nombre" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Productos" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Id_proveedor" integer NOT NULL,
	"Nombre" text NOT NULL,
	"Descripcion" text,
	"Precio_compra" double precision NOT NULL,
	"Precio_venta" double precision NOT NULL,
	"Id_categoria" integer NOT NULL,
	"Fecha" date NOT NULL,
	"Id_shein" text,
	"Inventario" boolean NOT NULL,
	"Cambio_dolar" double precision
);
--> statement-breakpoint
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_Id_categoria_fkey" FOREIGN KEY ("Id_categoria") REFERENCES "public"."Categorias"("Id") ON DELETE set null ON UPDATE cascade;
*/