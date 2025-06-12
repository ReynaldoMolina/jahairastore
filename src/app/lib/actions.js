'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from "@/app/lib/db";
import { getClientFormData, getProviderFormData, getReceiptFormData, getWebsiteFormData, getProductFormData, getOrderFormData, getPurchaseFormData, getExpenseFormData, getSaleFormData } from "@/app/lib/getFormData";
import { createRecord, createRecordDetail, goBackTo, updateDetailRecords, updateRecord } from "@/app/lib/actionsUtils";

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

export async function createClient(formData) {
  const data = getClientFormData(formData);

  await createRecord({
    tableName: 'Clientes',
    columns: ['Nombre', 'Apellido', 'Telefono', 'Municipio', 'Departamento', 'Pais', 'Direccion'],
    data
  });

  await goBackTo('/clientes');
}

export async function updateClient(id, formData) {
  const data = getClientFormData(formData);
  await updateRecord({ tableName: 'Clientes', id, data })
  // await goBackTo('/clientes');
}

export async function createProvider(formData) {
  const data = getProviderFormData(formData);

  await createRecord({
    tableName: 'Proveedores',
    columns: ['Nombre_empresa', 'Nombre_contacto', 'Telefono', 'Departamento', 'Municipio', 'Pais', 'Direccion'],
    data
  });

  await goBackTo('/proveedores');
}

export async function updateProvider(id, formData) {
  const data = getProviderFormData(formData);

  try {
    await sql`
      UPDATE "Proveedores"
      SET "Nombre_empresa" = ${data.Nombre_empresa}, "Nombre_contacto" = ${data.Nombre_contacto}, "Telefono" = ${data.Telefono}, "Departamento" = ${data.Departamento}, "Municipio" = ${data.Municipio}, "Pais" =  ${data.Pais}, "Direccion" = ${data.Direccion}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el proveedor')
  }

  revalidatePath('/proveedores');
  redirect('/proveedores');
}

export async function createCategory(formData) {
  const data = { Nombre: formData.get('Nombre').trim() }

  await createRecord({
    tableName: 'Categorias',
    columns: ['Nombre'],
    data
  });

  await goBackTo('/categorias');
}

export async function updateCategory(id, formData) {
  const data = { Nombre: formData.get('Nombre').trim() }

  try {
    await sql`
      UPDATE "Categorias"
      SET "Nombre" = ${data.Nombre}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar la categoría')
  }

  revalidatePath('/categorias');
  redirect('/categorias');
}

export async function createReceipt(formData) {
  const data = getReceiptFormData(formData);

  await createRecord({
    tableName: 'Recibos',
    columns: ['Id_pedido', 'Id_cliente', 'Fecha', 'Abono', 'Saldo', 'Concepto'],
    data
  });

  await goBackTo('/recibos');
}

export async function updateReceipt(id, formData) {
  const data = getReceiptFormData(formData);

  try {
    await sql`
      UPDATE "Recibos"
      SET "Id_pedido" = ${data.Id_pedido}, "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}, "Abono" = ${data.Abono}, "Saldo" =  ${data.Saldo}, "Concepto" = ${data.Concepto}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el recibo')
  }

  revalidatePath('/recibos');
  redirect('/recibos');
}

export async function createWebsiteProduct(formData) {
  const data = getWebsiteFormData(formData);

  await createRecord({
    tableName: 'ProductsPage',
    columns: ['Nombre', 'Precio', 'Imagen'],
    data
  });

  await goBackTo('/website');
}

export async function updateWebsiteProduct(id, formData) {
  const data = getWebsiteFormData(formData);

  try {
    await sql`
      UPDATE "ProductsPage"
      SET "Nombre" = ${data.Nombre}, "Precio" = ${data.Precio}, "Imagen" = ${data.Imagen}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el producto')
  }

  revalidatePath('/website');
  redirect('/website');
}

export async function createProduct(formData) {
  const data = getProductFormData(formData);

  await createRecord({
    tableName: 'Productos',
    columns: ['Id_proveedor', 'Nombre', 'Descripcion', 'Precio_compra', 'Precio_venta', 'Id_categoria', 'Fecha', 'Id_shein', 'Inventario', 'Cambio_dolar'],
    data
  });

  await goBackTo('/productos');
}

export async function updateProduct(id, formData) {
  const data = getProductFormData(formData);
  
  try {
    await sql`
      UPDATE "Productos"
      SET "Id_proveedor" = ${data.Id_proveedor}, "Nombre" = ${data.Nombre}, "Descripcion" = ${data.Descripcion}, "Precio_compra" = ${data.Precio_compra}, "Precio_venta" = ${data.Precio_venta}, "Id_categoria" = ${data.Id_categoria}, "Fecha" = ${data.Fecha}, "Id_shein" = ${data.Id_shein}, "Inventario" = ${data.Inventario}, "Cambio_dolar" = ${data.Cambio_dolar}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el producto');
  }

  revalidatePath('/productos');
  redirect('/productos');
}

export async function createOrder(formData, productList) {
  const data = getOrderFormData(formData);

  const id = await createRecord({
    tableName: 'Pedidos',
    columns: ['Id_cliente', 'Fecha', 'Peso', 'Cambio_dolar', 'Precio_libra'],
    data,
    returningId: true
  })

  await createRecordDetail({
    tableName: 'PedidosDetalles',
    recordId: id,
    columns: ['Id_pedido', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad'],
    productList
  })
  
  await goBackTo('/pedidos');
}

export async function updateOrder(id, formData, productList, originalList) {
  const data = getOrderFormData(formData);
  
  try {
    await sql`
      UPDATE "Pedidos"
      SET "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}, "Peso" = ${data.Peso}, "Cambio_dolar" = ${data.Cambio_dolar}, "Precio_libra" = ${data.Precio_libra}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el pedido');
  }

  await updateDetailRecords({
    foreignKeyName: 'Id_pedido',
    foreignKeyValue: Number(id),
    tableName: 'PedidosDetalles',
    productList,
    originalList,
    insertColumns: ['Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad'],
  });
  
  revalidatePath('/pedidos');
  redirect('/pedidos');
}

export async function createPurchase(formData, productList) {
  const data = getPurchaseFormData(formData);

  const id = await createRecord({
    tableName: 'Compras',
    columns: ['Id_proveedor', 'Fecha'],
    data,
    returningId: true
  });

  await createRecordDetail({
    tableName: 'ComprasDetalles',
    recordId: id,
    columns: ['Id_compra', 'Id_producto', 'Precio_compra', 'Cantidad', 'Precio_venta', 'Cambio_dolar'],
    productList
  });
  
  await goBackTo('/compras');
}

export async function updatePurchase(id, formData, productList, originalList) {
  const data = getPurchaseFormData(formData);

  try {
    await sql`
      UPDATE "Compras"
      SET "Id_proveedor" = ${data.Id_proveedor}, "Fecha" = ${data.Fecha}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la compra')
  }

  await updateDetailRecords({
    foreignKeyName: 'Id_compra',
    foreignKeyValue: Number(id),
    tableName: 'ComprasDetalles',
    productList,
    originalList,
    insertColumns: ['Id_producto', 'Precio_compra', 'Cantidad', 'Precio_venta', 'Cambio_dolar'],
  });

  revalidatePath('/compras');
  redirect('/compras');
}

export async function createExpense(formData) {
  const data = getExpenseFormData(formData);

  await createRecord({
    tableName: 'Egresos',
    columns: ['Id_compra', 'Id_proveedor', 'Fecha', 'Gasto', 'Concepto', 'Cambio_dolar'],
    data
  });

  await goBackTo('/gastos');
}

export async function updateExpense(id, formData) {
  const data = getExpenseFormData(formData);

  try {
    await sql`
      UPDATE "Egresos"
      SET "Id_compra" = ${data.Id_compra}, "Id_proveedor" = ${data.Id_proveedor}, "Fecha" = ${data.Fecha}, "Gasto" = ${data.Gasto}, "Concepto" = ${data.Concepto}, "Cambio_dolar" =  ${data.Cambio_dolar}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el gasto')
  }

  revalidatePath('/gastos');
  redirect('/gastos');
}

export async function createSale(formData, productList) {
  const data = getSaleFormData(formData);

  const id = await createRecord({
    tableName: 'Ventas',
    columns: ['Id_cliente', 'Fecha'],
    data,
    returningId: true
  });

  await createRecordDetail({
    tableName: 'VentasDetalles',
    recordId: id,
    columns: [ 'Id_venta', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad', 'Cambio_dolar'],
    productList
  });
  
  await goBackTo('/ventas');
}

export async function updateSale(id, formData, productList, originalList) {
  const data = getSaleFormData(formData);

  try {
    await sql`
      UPDATE "Ventas"
      SET "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la venta')
  }

  await updateDetailRecords({
    foreignKeyName: 'Id_venta',
    foreignKeyValue: Number(id),
    tableName: 'VentasDetalles',
    productList,
    originalList,
    insertColumns: ['Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad', 'Cambio_dolar'],
  });
  
  revalidatePath('/ventas');
  redirect('/ventas');
}