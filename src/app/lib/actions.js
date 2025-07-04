'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import {
  getClientFormData,
  getProviderFormData,
  getReceiptFormData,
  getProductFormData,
  getOrderFormData,
  getPurchaseFormData,
  getExpenseFormData,
  getSaleFormData,
} from '@/app/lib/getFormData';
import {
  createRecord,
  createRecordDetail,
  goBackTo,
  updateDetailRecords,
  updateRecord,
} from '@/app/lib/actionsUtils';

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

export async function createClient(prevState, formData) {
  try {
    const data = getClientFormData(formData);
    await createRecord({ tableName: 'Clientes', data });
  } catch (error) {
    return error;
  }
  await goBackTo('/clientes');
}

export async function updateClient(id, prevState, formData) {
  try {
    const data = getClientFormData(formData);
    await updateRecord({ tableName: 'Clientes', data, id });
  } catch (error) {
    return error;
  }
  await goBackTo('/clientes');
}

export async function createProvider(prevState, formData) {
  try {
    const data = getProviderFormData(formData);
    await createRecord({ tableName: 'Proveedores', data });
  } catch (error) {
    return error;
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(id, prevState, formData) {
  try {
    const data = getProviderFormData(formData);
    await updateRecord({ tableName: 'Proveedores', data, id });
  } catch (error) {
    return error;
  }
  await goBackTo('/proveedores');
}

export async function createCategory(prevState, formData) {
  try {
    const data = { Nombre: formData.get('Nombre').trim() };
    await createRecord({ tableName: 'Categorias', data });
  } catch (error) {
    return error;
  }
  await goBackTo('/categorias');
}

export async function updateCategory(id, prevState, formData) {
  try {
    const data = { Nombre: formData.get('Nombre').trim() };
    await updateRecord({ tableName: 'Categorias', data, id });
  } catch (error) {
    return error;
  }
  await goBackTo('/categorias');
}

export async function createReceipt(prevState, formData) {
  try {
    const data = getReceiptFormData(formData);
    await createRecord({ tableName: 'Recibos', data });
  } catch (error) {
    return error;
  }
  await goBackTo('/recibos');
}

export async function updateReceipt(id, prevState, formData) {
  try {
    const data = getReceiptFormData(formData);
    await updateRecord({ tableName: 'Recibos', data, id });
  } catch (error) {
    return error;
  }
  await goBackTo('/recibos');
}

export async function createProduct(formData) {
  const data = getProductFormData(formData);
  await createRecord({ tableName: 'Productos', data });
  await goBackTo('/productos');
}

export async function updateProduct(id, formData) {
  const data = getProductFormData(formData);
  await updateRecord({ tableName: 'Productos', data, id });
  await goBackTo('/productos');
}

export async function createOrder(formData, productList) {
  const data = getOrderFormData(formData);
  const id = await createRecord({
    tableName: 'Pedidos',
    data,
    returningId: true,
  });

  await createRecordDetail({
    tableName: 'PedidosDetalles',
    foreignKeyName: 'Id_pedido',
    foreignKeyValue: id,
    columns: [
      'Id_pedido',
      'Id_producto',
      'Precio_venta',
      'Precio_compra',
      'Cantidad',
    ],
    productList,
  });

  await goBackTo('/pedidos');
}

export async function updateOrder(id, formData, productList, originalList) {
  const data = getOrderFormData(formData);
  await updateRecord({ tableName: 'Pedidos', data, id });

  await updateDetailRecords({
    tableName: 'PedidosDetalles',
    foreignKeyName: 'Id_pedido',
    foreignKeyValue: Number(id),
    productList,
    originalList,
    columns: [
      'Id_pedido',
      'Id_producto',
      'Precio_venta',
      'Precio_compra',
      'Cantidad',
    ],
    updateColumns: ['Cantidad', 'Precio_venta'],
  });

  await goBackTo('/pedidos');
}

export async function createPurchase(formData, productList) {
  const data = getPurchaseFormData(formData);
  const id = await createRecord({
    tableName: 'Compras',
    data,
    returningId: true,
  });

  await createRecordDetail({
    tableName: 'ComprasDetalles',
    foreignKeyName: 'Id_compra',
    foreignKeyValue: id,
    columns: [
      'Id_compra',
      'Id_producto',
      'Precio_compra',
      'Cantidad',
      'Precio_venta',
      'Cambio_dolar',
    ],
    productList,
  });

  await goBackTo('/compras');
}

export async function updatePurchase(id, formData, productList, originalList) {
  const data = getPurchaseFormData(formData);
  await updateRecord({ tableName: 'Compras', data, id });

  await updateDetailRecords({
    foreignKeyName: 'Id_compra',
    foreignKeyValue: Number(id),
    tableName: 'ComprasDetalles',
    productList,
    originalList,
    columns: [
      'Id_compra',
      'Id_producto',
      'Precio_compra',
      'Cantidad',
      'Precio_venta',
      'Cambio_dolar',
    ],
    updateColumns: ['Cantidad', 'Precio_compra'],
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
  await updateRecord({ tableName: 'Egresos', data, id });
  await goBackTo('/gastos');
}

export async function createSale(formData, productList) {
  const data = getSaleFormData(formData);
  const id = await createRecord({
    tableName: 'Ventas',
    data,
    returningId: true,
  });

  await createRecordDetail({
    tableName: 'VentasDetalles',
    foreignKeyName: 'Id_venta',
    foreignKeyValue: id,
    columns: [
      'Id_venta',
      'Id_producto',
      'Precio_venta',
      'Precio_compra',
      'Cantidad',
      'Cambio_dolar',
    ],
    productList,
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
    columns: [
      'Id_venta',
      'Id_producto',
      'Precio_venta',
      'Precio_compra',
      'Cantidad',
      'Cambio_dolar',
    ],
    updateColumns: ['Cantidad', 'Precio_venta'],
  });

  await goBackTo('/ventas');
}
