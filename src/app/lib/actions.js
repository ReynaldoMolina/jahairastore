'use server';
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function createClient(formData) {
  const data = {
    Nombre: formData.get('Nombre'),
    Apellido: formData.get('Apellido'),
    Telefono: formData.get('Telefono'),
    Municipio: formData.get('Municipio'),
    Departamento: formData.get('Departamento'),
    Pais: formData.get('Pais'),
    Direccion: formData.get('Direccion'),
  }

  try {
    await sql`
      INSERT INTO "Clientes" ("Nombre", "Apellido", "Telefono", "Municipio", "Departamento", "Pais", "Direccion")
      VALUES (${data.Nombre}, ${data.Apellido}, ${data.Telefono}, ${data.Municipio}, ${data.Departamento}, ${data.Pais}, ${data.Direccion})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el cliente');
  }

  revalidatePath('/clients');
  redirect('/clients');
}

export async function updateClient(id, formData) {
  const data = {
    Nombre: formData.get('Nombre'),
    Apellido: formData.get('Apellido'),
    Telefono: formData.get('Telefono'),
    Municipio: formData.get('Municipio'),
    Departamento: formData.get('Departamento'),
    Pais: formData.get('Pais'),
    Direccion: formData.get('Direccion'),
  }

  try {
    await sql`
      UPDATE "Clientes"
      SET "Nombre" = ${data.Nombre}, "Apellido" = ${data.Apellido}, "Telefono" = ${data.Telefono}, "Municipio" = ${data.Municipio}, "Departamento" = ${data.Departamento}, "Pais" =  ${data.Pais}, "Direccion" = ${data.Direccion}
      WHERE "Id_cliente" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el cliente')
  }

  revalidatePath('/clients');
  redirect('/clients');
}

export async function createProvider(formData) {
  const data = {
    Nombre_empresa: formData.get('Nombre_empresa'),
    Nombre_contacto: formData.get('Nombre_contacto'),
    Telefono: formData.get('Telefono'),
    Departamento: formData.get('Departamento'),
    Municipio: formData.get('Municipio'),
    Pais: formData.get('Pais'),
    Direccion: formData.get('Direccion'),
  }

  try {
    await sql`
      INSERT INTO "Proveedores" ("Nombre_empresa", "Nombre_contacto", "Telefono", "Departamento", "Municipio", "Pais", "Direccion")
      VALUES (${data.Nombre_empresa}, ${data.Nombre_contacto}, ${data.Telefono}, ${data.Departamento}, ${data.Municipio}, ${data.Pais}, ${data.Direccion})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el proveedor');
  }

  revalidatePath('/providers');
  redirect('/providers');
}

export async function updateProvider(id, formData) {
  const data = {
    Nombre_empresa: formData.get('Nombre_empresa'),
    Nombre_contacto: formData.get('Nombre_contacto'),
    Telefono: formData.get('Telefono'),
    Departamento: formData.get('Departamento'),
    Municipio: formData.get('Municipio'),
    Pais: formData.get('Pais'),
    Direccion: formData.get('Direccion'),
  }

  try {
    await sql`
      UPDATE "Proveedores"
      SET "Nombre_empresa" = ${data.Nombre_empresa}, "Nombre_contacto" = ${data.Nombre_contacto}, "Telefono" = ${data.Telefono}, "Departamento" = ${data.Departamento}, "Municipio" = ${data.Municipio}, "Pais" =  ${data.Pais}, "Direccion" = ${data.Direccion}
      WHERE "Id_proveedor" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el proveedor')
  }

  revalidatePath('/providers');
  redirect('/providers');
}

export async function createCategory(formData) {
  const data = {
    Nombre_categoria: formData.get('Nombre_categoria'),
  }

  try {
    await sql`
      INSERT INTO "Categoria_productos" ("Nombre_categoria")
      VALUES (${data.Nombre_categoria})
    `;
  } catch (error) {
    throw new Error('No se pudo crear la categoría');
  }

  revalidatePath('/categories');
  redirect('/categories');
}

export async function updateCategory(id, formData) {
  const data = {
    Nombre_categoria: formData.get('Nombre_categoria'),
  }

  try {
    await sql`
      UPDATE "Categoria_productos"
      SET "Nombre_categoria" = ${data.Nombre_categoria}
      WHERE "Id_categoria" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la categoría')
  }

  revalidatePath('/categories');
  redirect('/categories');
}

export async function createReceipt(formData) {
  const data = {
    Id_pedido: Number(formData.get('Id_pedido')),
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Abono: Number(formData.get('Abono')),
    Saldo: Number(formData.get('Saldo')),
    Concepto: formData.get('Concepto'),
  }

  try {
    await sql`
      INSERT INTO "Ventas" ("Id_pedido", "Id_cliente", "Fecha", "Abono", "Saldo", "Concepto")
      VALUES (${data.Id_pedido}, ${data.Id_cliente}, ${data.Fecha}, ${data.Abono}, ${data.Saldo}, ${data.Concepto})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el recibo');
  }

  revalidatePath('/receipts');
  redirect('/receipts');
}

export async function updateReceipt(id, formData) {
  const data = {
    Id_pedido: Number(formData.get('Id_pedido')),
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Abono: Number(formData.get('Abono')),
    Saldo: Number(formData.get('Saldo')),
    Concepto: formData.get('Concepto'),
  }

  try {
    await sql`
      UPDATE "Ventas"
      SET "Id_pedido" = ${data.Id_pedido}, "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}, "Abono" = ${data.Abono}, "Saldo" =  ${data.Saldo}, "Concepto" = ${data.Concepto}
      WHERE "Id_venta" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el recibo')
  }

  revalidatePath('/receipts');
  redirect('/receipts');
}

export async function createWebsiteProduct(formData) {
  const data = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    image: formData.get('image'),
  }

  try {
    await sql`
      INSERT INTO "ProductsPage" ("name", "price", "image")
      VALUES (${data.name}, ${data.price}, ${data.image})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el producto');
  }

  revalidatePath('/website');
  redirect('/website');
}

export async function updateWebsiteProduct(id, formData) {
  const data = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    image: formData.get('image'),
  }

  try {
    await sql`
      UPDATE "ProductsPage"
      SET "name" = ${data.name}, "price" = ${data.price}, "image" = ${data.image}
      WHERE "id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el producto')
  }

  revalidatePath('/website');
  redirect('/website');
}

export async function createProduct(formData) {
  const data = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Nombre: formData.get('Nombre'),
    Descripcion: formData.get('Descripcion'),
    Precio_compra: Number(formData.get('Precio_compra')),
    Precio_venta: Number(formData.get('Precio_venta')),
    Id_categoria: Number(formData.get('Id_categoria')),
    Fecha_agregado: formData.get('Fecha_agregado'),
    Id_shein: formData.get('Id_shein')
  }

  try {
    await sql`
      INSERT INTO "Productos" ("Id_proveedor", "Nombre", "Descripcion", "Precio_compra", "Precio_venta", "Id_categoria", "Fecha_agregado", "Id_shein")
      VALUES (${data.Id_proveedor}, ${data.Nombre}, ${data.Descripcion}, ${data.Precio_compra}, ${data.Precio_venta}, ${data.Id_categoria}, ${data.Fecha_agregado}, ${data.Id_shein})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el producto');
  }

  revalidatePath('/products');
  redirect('/products');
}

export async function updateProduct(id, formData) {
  const data = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Nombre: formData.get('Nombre'),
    Descripcion: formData.get('Descripcion'),
    Precio_compra: Number(formData.get('Precio_compra')),
    Precio_venta: Number(formData.get('Precio_venta')),
    Id_categoria: Number(formData.get('Id_categoria')),
    Fecha_agregado: formData.get('Fecha_agregado'),
    Id_shein: formData.get('Id_shein')
  }

  try {
    await sql`
      UPDATE "Productos"
      SET "Id_proveedor" = ${data.Id_proveedor}, "Nombre" = ${data.Nombre}, "Descripcion" = ${data.Descripcion}, "Precio_compra" = ${data.Precio_compra}, "Precio_venta" = ${data.Precio_venta}, "Id_categoria" = ${data.Id_categoria}, "Fecha_agregado" = ${data.Fecha_agregado}, "Id_shein" = ${data.Id_shein},
      WHERE "Id_producto" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el producto')
  }

  revalidatePath('/products');
  redirect('/products');
}