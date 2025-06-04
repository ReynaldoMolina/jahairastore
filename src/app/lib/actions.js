'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from "@/app/lib/db";

export async function createClient(formData) {
  const newTelefono = formData.get('Telefono') === '+505 '
    ? '' : formData.get('Telefono');

  const data = {
    Nombre: formData.get('Nombre'),
    Apellido: formData.get('Apellido'),
    Telefono: newTelefono,
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
  const newTelefono = formData.get('Telefono') === '+505 '
    ? '' : formData.get('Telefono');

  const data = {
    Nombre: formData.get('Nombre'),
    Apellido: formData.get('Apellido'),
    Telefono: newTelefono,
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
  const newTelefono = formData.get('Telefono') === '+505 '
    ? '' : formData.get('Telefono');

  const data = {
    Nombre_empresa: formData.get('Nombre_empresa'),
    Nombre_contacto: formData.get('Nombre_contacto'),
    Telefono: newTelefono,
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
  const newTelefono = formData.get('Telefono') === '+505 '
    ? '' : formData.get('Telefono');

  const data = {
    Nombre_empresa: formData.get('Nombre_empresa'),
    Nombre_contacto: formData.get('Nombre_contacto'),
    Telefono: newTelefono,
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
  let Id_venta;

  const data = {
    Id_pedido: Number(formData.get('Id_pedido')),
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Abono: Number(formData.get('Abono')),
    Saldo: Number(formData.get('Saldo')),
    Concepto: formData.get('Concepto'),
  }

  try {
    const result = await sql`
      INSERT INTO "Ventas" ("Id_pedido", "Id_cliente", "Fecha", "Abono", "Saldo", "Concepto")
      VALUES (${data.Id_pedido}, ${data.Id_cliente}, ${data.Fecha}, ${data.Abono}, ${data.Saldo}, ${data.Concepto})
      RETURNING "Id_venta"
    `;
    console.log(result[0]);
    
    Id_venta = result[0].Id_venta;

    console.log(Id_venta);
    
  } catch (error) {
    throw new Error('No se pudo crear el recibo');
  }

  redirect(`/receipts/${Id_venta}/edit`);
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
    Id_shein: formData.get('Id_shein'),
    Inventario: formData.get('Inventario') === 'on' ? true : false,
    Cambio_dolar: Number(formData.get('Cambio_dolar')) || null,
  }  

  try {
    await sql`
      INSERT INTO "Productos" ("Id_proveedor", "Nombre", "Descripcion", "Precio_compra", "Precio_venta", "Id_categoria", "Fecha_agregado", "Id_shein", "Inventario", "Cambio_dolar")
      VALUES (${data.Id_proveedor}, ${data.Nombre}, ${data.Descripcion}, ${data.Precio_compra}, ${data.Precio_venta}, ${data.Id_categoria}, ${data.Fecha_agregado}, ${data.Id_shein}, ${data.Inventario}, ${data.Cambio_dolar})
    `;
  } catch (error) {
    console.error(error);
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
    Id_shein: formData.get('Id_shein'),
    Inventario: formData.get('Inventario') === 'on' ? true : false,
    Cambio_dolar: Number(formData.get('Cambio_dolar')) || null,
  }
  
  try {
    await sql`
      UPDATE "Productos"
      SET "Id_proveedor" = ${data.Id_proveedor}, "Nombre" = ${data.Nombre}, "Descripcion" = ${data.Descripcion}, "Precio_compra" = ${data.Precio_compra}, "Precio_venta" = ${data.Precio_venta}, "Id_categoria" = ${data.Id_categoria}, "Fecha_agregado" = ${data.Fecha_agregado}, "Id_shein" = ${data.Id_shein}, "Inventario" = ${data.Inventario}, "Cambio_dolar" = ${data.Cambio_dolar}
      WHERE "Id_producto" = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el producto');
  }

  revalidatePath('/products');
  redirect('/products');
}

export async function createOrder(formData, productList) {
  let Id_pedido;

  const order = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha_del_pedido: formData.get('Fecha_del_pedido'),
    Peso: 0,
    Cambio_dolar: 37,
    Precio_libra: 3
  };

  try {
    const result = await sql`
      INSERT INTO "Pedidos" ("Id_cliente", "Fecha_del_pedido", "Peso", "Cambio_dolar", "Precio_libra")
      VALUES (${order.Id_cliente}, ${order.Fecha_del_pedido}, ${order.Peso}, ${order.Cambio_dolar}, ${order.Precio_libra})
      RETURNING "Id_pedido"
    `;
    Id_pedido = result[0].Id_pedido;
  } catch (error) {
    console.error(error);
    
    throw new Error('No se pudo crear el pedido');
  }

  await createOrderDetail(Id_pedido, productList);
  
  // revalidatePath('/orders');
  redirect(`/orders/${Id_pedido}/edit`);
}

export async function createOrderDetail(Id_pedido, productList) {
  try {
    const values = productList.map(product => {
      const { Id_producto, Precio_venta, Precio_compra, Cantidad_venta } = product;
      return [Id_pedido, Id_producto, Precio_venta, Precio_compra, Cantidad_venta];
    });
    
    await sql`
      INSERT INTO "PedidosDetalles" ("Id_pedido", "Id_producto", "Precio_venta", "Precio_compra", "Cantidad_venta")
      VALUES ${sql(values)}
    `;
  } catch (error) {
    throw new Error('No se pudo crear el detalle del pedido');
  }
}

export async function updateOrder(orderId, formData, productList, originalList) {
  const data = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha_del_pedido: formData.get('Fecha_del_pedido'),
    Peso: Number(formData.get('Peso')),
    Cambio_dolar: Number(formData.get('Cambio_dolar')),
    Precio_libra: Number(formData.get('Precio_libra'))
  };

  try {
    await sql`
      UPDATE "Pedidos"
      SET "Id_cliente" = ${data.Id_cliente}, "Fecha_del_pedido" = ${data.Fecha_del_pedido}, "Peso" = ${data.Peso}, "Cambio_dolar" = ${data.Cambio_dolar}, "Precio_libra" = ${data.Precio_libra}
      WHERE "Id_pedido" = ${orderId}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el pedido')
  }

  await updateOrderDetail(orderId, productList, originalList);

  revalidatePath('/orders');
  redirect('/orders');
}

export async function updateOrderDetail(orderId, productList, originalList) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications & deletions
  originalList.forEach(originalProduct => {
    const updated = productList.find(updatedProduct => updatedProduct.Id_detalle === originalProduct.Id_detalle);
    
    if (!updated) {
      // It was removed
      deletions.push(originalProduct.Id_detalle);
    } else if (updated.Cantidad_venta !== originalProduct.Cantidad_venta) {
      // It was modified
      updates.push(updated);
    }
  });

  // Check new additions
  productList.forEach(detail => {
    if (!detail.Id_detalle) {
      // No ID means it’s new
      const newDetail = {
        Id_pedido: Number(orderId),
        ...detail
      }
      creations.push(newDetail);
    }
  });

  try {
    await Promise.all([
      // Update existing records
      ...updates.map(detail =>
        sql`
          UPDATE "PedidosDetalles"
          SET "Cantidad_venta" = ${detail.Cantidad_venta}
          WHERE "Id_detalle" = ${detail.Id_detalle}
        `
      ),

      // Delete removed records
      ...deletions.map(id =>
        sql`
          DELETE FROM "PedidosDetalles"
          WHERE "Id_detalle" = ${id}
        `
      ),

      // Insert new records
      ...creations.map(detail =>
        sql`
          INSERT INTO "PedidosDetalles" ("Id_pedido", "Id_producto", "Precio_venta", "Precio_compra", "Cantidad_venta")
          VALUES (${detail.Id_pedido}, ${detail.Id_producto}, ${detail.Precio_venta}, ${detail.Precio_compra}, ${detail.Cantidad_venta})
        `
      )
    ]);
  } catch (error) {
    throw new Error("No se pudieron procesar los detalles del pedido")
  }
}

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Datos incorrectos';
        default:
          return `Algo salió mal, ${error.message}`;
      }
    }
    throw error;
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: '/' });
}