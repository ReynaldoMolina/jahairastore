'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
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
  await createRecord({ tableName: 'Clientes', data });
  await goBackTo('/clientes');
}

export async function updateClient(id, formData) {
  const data = getClientFormData(formData);
  await updateRecord({ tableName: 'Clientes', data, id });
  await goBackTo('/clientes');
}

export async function createProvider(formData) {
  const data = getProviderFormData(formData);
  await createRecord({ tableName: 'Proveedores', data });
  await goBackTo('/proveedores');
}

export async function updateProvider(id, formData) {
  const data = getProviderFormData(formData);
  await updateRecord({ tableName: 'Proveedores', data, id });
  await goBackTo('/proveedores');
}

export async function createCategory(formData) {
  const data = { Nombre: formData.get('Nombre').trim() };
  await createRecord({ tableName: 'Categorias', data });
  await goBackTo('/categorias');
}

export async function updateCategory(id, formData) {
  const data = { Nombre: formData.get('Nombre').trim() }
  await updateRecord({ tableName: 'Categorias', data, id });
  await goBackTo('/categorias');
}

export async function createReceipt(formData) {
  const data = getReceiptFormData(formData);
  await createRecord({ tableName: 'Recibos', data });
  await goBackTo('/recibos');
}

export async function updateReceipt(id, formData) {
  const data = getReceiptFormData(formData);
  await updateRecord({ tableName: 'Recibos', data, id })
  await goBackTo('/recibos');
}

export async function createWebsiteProduct(formData) {
  const data = getWebsiteFormData(formData);
  await createRecord({ tableName: 'ProductsPage', data });
  await goBackTo('/website');
}

export async function updateWebsiteProduct(id, formData) {
  const data = getWebsiteFormData(formData);
  await updateRecord({ tableName: 'ProductsPage', data, id })
  await goBackTo('/website');
}

export async function createProduct(formData) {
  const data = getProductFormData(formData);
  await createRecord({ tableName: 'Productos', data })
  await goBackTo('/productos');
}

export async function updateProduct(id, formData) {
  const data = getProductFormData(formData);
  await updateRecord({ tableName: 'Productos', data, id })
  await goBackTo('/productos');
}

export async function createOrder(formData, productList) {
  const data = getOrderFormData(formData);
  const id = await createRecord({ tableName: 'Pedidos', data, returningId: true });

  await createRecordDetail({
    tableName: 'PedidosDetalles',
    foreignKeyName: 'Id_pedido',
    foreignKeyValue: id,
    columns: ['Id_pedido', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad'],
    productList
  })
  
  await goBackTo('/pedidos');
}

export async function updateOrder(id, formData, productList, originalList) {
  const data = getOrderFormData(formData);
  await updateRecord({ tableName: 'Pedidos', data, id })

  await updateDetailRecords({
    tableName: 'PedidosDetalles',
    foreignKeyName: 'Id_pedido',
    foreignKeyValue: Number(id),
    productList,
    originalList,
    columns: ['Id_pedido', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad'],
  });
  
  await goBackTo('/pedidos');
}

export async function createPurchase(formData, productList) {
  const data = getPurchaseFormData(formData);
  const id = await createRecord({ tableName: 'Compras', data, returningId: true });

  await createRecordDetail({
    tableName: 'ComprasDetalles',
    foreignKeyName: 'Id_compra',
    foreignKeyValue: id,
    columns: ['Id_compra', 'Id_producto', 'Precio_compra', 'Cantidad', 'Precio_venta', 'Cambio_dolar'],
    productList
  });
  
  await goBackTo('/compras');
}

export async function updatePurchase(id, formData, productList, originalList) {
  const data = getPurchaseFormData(formData);
  await updateRecord({ tableName: 'Compras', data, id })

  await updateDetailRecords({
    foreignKeyName: 'Id_compra',
    foreignKeyValue: Number(id),
    tableName: 'ComprasDetalles',
    productList,
    originalList,
    columns: ['Id_compra', 'Id_producto', 'Precio_compra', 'Cantidad', 'Precio_venta', 'Cambio_dolar'],
  });

  await goBackTo('/compras');
}

export async function createExpense(formData) {
  const data = getExpenseFormData(formData);
  await createRecord({ tableName: 'Egresos', data });
  await goBackTo('/gastos');
}

export async function updateExpense(id, formData) {
  const data = getExpenseFormData(formData);
  await updateRecord({ tableName: 'Egresos', data, id })
  await goBackTo('/gastos');
}

export async function createSale(formData, productList) {
  const data = getSaleFormData(formData);
  const id = await createRecord({ tableName: 'Ventas', data, returningId: true });

  await createRecordDetail({
    tableName: 'VentasDetalles',
    foreignKeyName: 'Id_venta',
    foreignKeyValue: id,
    columns: [ 'Id_venta', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad', 'Cambio_dolar'],
    productList
  });
  
  await goBackTo('/ventas');
}

export async function updateSale(id, formData, productList, originalList) {
  const data = getSaleFormData(formData);
  await updateRecord({ tableName: 'Ventas', data, id });

  await updateDetailRecords({
    foreignKeyName: 'Id_venta',
    foreignKeyValue: Number(id),
    tableName: 'VentasDetalles',
    productList,
    originalList,
    columns: ['Id_venta', 'Id_producto', 'Precio_venta', 'Precio_compra', 'Cantidad', 'Cambio_dolar'],
  });
  
  await goBackTo('/ventas');
}