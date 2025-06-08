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

  revalidatePath('/clientes');
  redirect('/clientes');
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
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar el cliente')
  }

  revalidatePath('/clientes');
  redirect('/clientes');
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

  revalidatePath('/proveedores');
  redirect('/proveedores');
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
  const data = {
    Nombre: formData.get('Nombre'),
  }

  try {
    await sql`
      INSERT INTO "Categorias" ("Nombre")
      VALUES (${data.Nombre})
    `;
  } catch (error) {
    throw new Error('No se pudo crear la categoría');
  }

  revalidatePath('/categorias');
  redirect('/categorias');
}

export async function updateCategory(id, formData) {
  const data = {
    Nombre: formData.get('Nombre'),
  }

  try {
    await sql`
      UPDATE "Categorias"
      SET "Nombre" = ${data.Nombre}
      WHERE "Id" = ${id}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la categoría')
  }

  revalidatePath('/categorias');
  redirect('/categorias');
}

export async function createReceipt(formData) {
  let Id_recibo;

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
      INSERT INTO "Recibos" ("Id_pedido", "Id_cliente", "Fecha", "Abono", "Saldo", "Concepto")
      VALUES (${data.Id_pedido}, ${data.Id_cliente}, ${data.Fecha}, ${data.Abono}, ${data.Saldo}, ${data.Concepto})
      RETURNING "Id"
    `;
    
    Id_recibo = result[0].Id;
    
  } catch (error) {
    throw new Error('No se pudo crear el recibo');
  }

  redirect(`/recibos/${Id_recibo}`);
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
  const data = {
    Nombre: formData.get('Nombre'),
    Precio: Number(formData.get('Precio')),
    Imagen: formData.get('Imagen'),
  }

  try {
    await sql`
      INSERT INTO "ProductsPage" ("Nombre", "Precio", "Imagen")
      VALUES (${data.Nombre}, ${data.Precio}, ${data.Imagen})
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el producto');
  }

  revalidatePath('/website');
  redirect('/website');
}

export async function updateWebsiteProduct(id, formData) {
  const data = {
    Nombre: formData.get('Nombre'),
    Precio: Number(formData.get('Precio')),
    Imagen: formData.get('Imagen'),
  }

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
  const data = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Nombre: formData.get('Nombre'),
    Descripcion: formData.get('Descripcion'),
    Precio_compra: Number(formData.get('Precio_compra')),
    Precio_venta: Number(formData.get('Precio_venta')),
    Id_categoria: Number(formData.get('Id_categoria')),
    Fecha: formData.get('Fecha'),
    Id_shein: formData.get('Id_shein'),
    Inventario: formData.get('Inventario') === 'on' ? true : false,
    Cambio_dolar: Number(formData.get('Cambio_dolar')) || null,
  }  

  try {
    await sql`
      INSERT INTO "Productos" ("Id_proveedor", "Nombre", "Descripcion", "Precio_compra", "Precio_venta", "Id_categoria", "Fecha", "Id_shein", "Inventario", "Cambio_dolar")
      VALUES (${data.Id_proveedor}, ${data.Nombre}, ${data.Descripcion}, ${data.Precio_compra}, ${data.Precio_venta}, ${data.Id_categoria}, ${data.Fecha}, ${data.Id_shein}, ${data.Inventario}, ${data.Cambio_dolar})
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el producto');
  }

  revalidatePath('/productos');
  redirect('/productos');
}

export async function updateProduct(id, formData) {
  const data = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Nombre: formData.get('Nombre'),
    Descripcion: formData.get('Descripcion'),
    Precio_compra: Number(formData.get('Precio_compra')),
    Precio_venta: Number(formData.get('Precio_venta')),
    Id_categoria: Number(formData.get('Id_categoria')),
    Fecha: formData.get('Fecha'),
    Id_shein: formData.get('Id_shein'),
    Inventario: formData.get('Inventario') === 'on' ? true : false,
    Cambio_dolar: Number(formData.get('Cambio_dolar')) || null,
  }
  
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
  let Id_pedido;

  const order = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Peso: 0,
    Cambio_dolar: 37,
    Precio_libra: 3
  };

  try {
    const result = await sql`
      INSERT INTO "Pedidos" ("Id_cliente", "Fecha", "Peso", "Cambio_dolar", "Precio_libra")
      VALUES (${order.Id_cliente}, ${order.Fecha}, ${order.Peso}, ${order.Cambio_dolar}, ${order.Precio_libra})
      RETURNING "Id"
    `;
    Id_pedido = result[0].Id;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el pedido');
  }

  await createOrderDetail(Id_pedido, productList);
  
  // revalidatePath('/pedidos');
  redirect(`/pedidos/${Id_pedido}`);
}

export async function createOrderDetail(Id_pedido, productList) {
  try {
    const values = productList.map(product => {
      const { Id, Precio_venta, Precio_compra, Cantidad } = product;
      return [Id_pedido, Id, Precio_venta, Precio_compra, Cantidad];
    });
    
    await sql`
      INSERT INTO "PedidosDetalles" ("Id_pedido", "Id_producto", "Precio_venta", "Precio_compra", "Cantidad")
      VALUES ${sql(values)}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el detalle del pedido');
  }
}

export async function updateOrder(orderId, formData, productList, originalList) {
  const data = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Peso: Number(formData.get('Peso')),
    Cambio_dolar: Number(formData.get('Cambio_dolar')),
    Precio_libra: Number(formData.get('Precio_libra'))
  };
  
  try {
    await sql`
      UPDATE "Pedidos"
      SET "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}, "Peso" = ${data.Peso}, "Cambio_dolar" = ${data.Cambio_dolar}, "Precio_libra" = ${data.Precio_libra}
      WHERE "Id" = ${orderId}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el pedido')
  }

  await updateOrderDetail(orderId, productList, originalList);

  revalidatePath('/pedidos');
  redirect('/pedidos');
}

export async function updateOrderDetail(orderId, productList, originalList) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications & deletions
  originalList.forEach(originalDetail => {
    const updated = productList.find(updatedDetail => updatedDetail.Id === originalDetail.Id);
    
    if (!updated) {
      // It was removed
      deletions.push(originalDetail.Id);
    } else if (updated.Cantidad !== originalDetail.Cantidad) {
      // It was modified
      updates.push(updated);
    }
  });

  // Check new additions
  productList.forEach(detail => {
    if (!detail.Id) {
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
          SET "Cantidad" = ${detail.Cantidad}
          WHERE "Id" = ${detail.Id}
        `
      ),

      // Delete removed records
      ...deletions.map(id =>
        sql`
          DELETE FROM "PedidosDetalles"
          WHERE "Id" = ${id}
        `
      ),

      // Insert new records
      ...creations.map(detail =>
        sql`
          INSERT INTO "PedidosDetalles" ("Id_pedido", "Id_producto", "Precio_venta", "Precio_compra", "Cantidad")
          VALUES (${detail.Id_pedido}, ${detail.Id_producto}, ${detail.Precio_venta}, ${detail.Precio_compra}, ${detail.Cantidad})
        `
      )
    ]);
  } catch (error) {
    console.error(error);
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

export async function createPurchase(formData, productList) {
  let Id_compra;

  const purchase = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha')
  };

  try {
    const result = await sql`
      INSERT INTO "Compras" ("Id_proveedor", "Fecha")
      VALUES (${purchase.Id_proveedor}, ${purchase.Fecha})
      RETURNING "Id_compra"
    `;
    Id_compra = result[0].Id_compra;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear la compra');
  }

  await createPurchaseDetail(Id_compra, productList);
  
  redirect(`/compras/${Id_compra}`);
}

export async function createPurchaseDetail(Id_compra, productList) {
  try {
    const values = productList.map(product => {
      const { Id_producto, Precio_compra, Cantidad, Precio_venta, Cambio_dolar } = product;
      return [Id_compra, Id_producto, Precio_compra, Cantidad, Precio_venta, Cambio_dolar];
    });
    
    await sql`
      INSERT INTO "ComprasDetalles" ("Id_compra", "Id_producto", "Precio_compra", "Cantidad", "Precio_venta", "Cambio_dolar")
      VALUES ${sql(values)}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el detalle de la compra');
  }
}

export async function updatePurchase(purchaseId, formData, productList, originalList) {
  const data = {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha')
  };

  try {
    await sql`
      UPDATE "Compras"
      SET "Id_proveedor" = ${data.Id_proveedor}, "Fecha" = ${data.Fecha}
      WHERE "Id" = ${purchaseId}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la compra')
  }

  await updatePurchaseDetail(purchaseId, productList, originalList);

  revalidatePath('/compras');
  redirect('/compras');
}

export async function updatePurchaseDetail(purchaseId, productList, originalList) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications & deletions
  originalList.forEach(originalDetail => {
    const updated = productList.find(updatedDetail => updatedDetail.Id === originalDetail.Id);
    
    if (!updated) {
      // It was removed
      deletions.push(originalDetail.Id);
    } else if (updated.Cantidad !== originalDetail.Cantidad) {
      // It was modified
      updates.push(updated);
    }
  });

  // Check new additions
  productList.forEach(detail => {
    if (!detail.Id) {
      // No ID means it’s new
      const newDetail = {
        Id_compra: Number(purchaseId),
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
          UPDATE "ComprasDetalles"
          SET "Cantidad" = ${detail.Cantidad}
          WHERE "Id" = ${detail.Id}
        `
      ),

      // Delete removed records
      ...deletions.map(id =>
        sql`
          DELETE FROM "ComprasDetalles"
          WHERE "Id" = ${id}
        `
      ),

      // Insert new records
      ...creations.map(detail =>
        sql`
          INSERT INTO "ComprasDetalles" ("Id_compra", "Id_producto", "Precio_compra", "Cantidad", "Precio_venta", "Cambio_dolar")
          VALUES (${detail.Id_compra}, ${detail.Id_producto}, ${detail.Precio_compra}, ${detail.Cantidad}, ${detail.Precio_venta}, ${detail.Cambio_dolar})
        `
      )
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("No se pudieron procesar los detalles de la compra")
  }
}

export async function createExpense(formData) {
  const data = {
    Id_compra: Number(formData.get('Id_compra')),
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha'),
    Gasto: Number(formData.get('Gasto')),
    Concepto: formData.get('Concepto'),
    Cambio_dolar: Number(formData.get('Cambio_dolar')),
  }

  try {
    await sql`
      INSERT INTO "Egresos" ("Id_compra", "Id_proveedor", "Fecha", "Gasto", "Concepto", "Cambio_dolar")
      VALUES (${data.Id_compra}, ${data.Id_proveedor}, ${data.Fecha}, ${data.Gasto}, ${data.Concepto}, ${data.Cambio_dolar})
    `;
  } catch (error) {
    throw new Error('No se pudo crear el gasto');
  }

  revalidatePath('/gastos');
  redirect('/gastos');
}

export async function updateExpense(id, formData) {
  const data = {
    Id_compra: Number(formData.get('Id_compra')),
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha'),
    Gasto: Number(formData.get('Gasto')),
    Concepto: formData.get('Concepto'),
    Cambio_dolar: Number(formData.get('Cambio_dolar')),
  }

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
  let Id_venta;

  const venta = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
  };

  try {
    const result = await sql`
      INSERT INTO "Ventas" ("Id_cliente", "Fecha")
      VALUES (${venta.Id_cliente}, ${venta.Fecha})
      RETURNING "Id"
    `;
    Id_venta = result[0].Id;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el pedido');
  }

  await createSaleDetail(Id_venta, productList);
  
  redirect(`/ventas`);
}

export async function createSaleDetail(Id_venta, productList) {
  try {
    const values = productList.map(product => {
      const { Id_producto, Precio_venta, Precio_compra, Cantidad, Cambio_dolar } = product;
      return [Id_producto, Precio_venta, Precio_compra, Cantidad, Cambio_dolar, Id_venta];
    });
    
    await sql`
      INSERT INTO "VentasDetalles" ("Id_producto", "Precio_venta", "Precio_compra", "Cantidad", "Cambio_dolar", "Id_venta")
      VALUES ${sql(values)}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el detalle del pedido');
  }
}

export async function updateSale(saleId, formData, productList, originalList) {
  const data = {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha')
  };

  try {
    await sql`
      UPDATE "Ventas"
      SET "Id_cliente" = ${data.Id_cliente}, "Fecha" = ${data.Fecha}
      WHERE "Id" = ${saleId}
    `;
  } catch (error) {
    throw new Error('No se pudo actualizar la venta')
  }

  await updateSaleDetail(saleId, productList, originalList);

  revalidatePath('/ventas');
  redirect('/ventas');
}

export async function updateSaleDetail(saleId, productList, originalList) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications & deletions
  originalList.forEach(originalDetail => {
    const updated = productList.find(updatedDetail => updatedDetail.Id === originalDetail.Id);
    
    if (!updated) {
      // It was removed
      deletions.push(originalDetail.Id);
    } else if (updated.Cantidad !== originalDetail.Cantidad) {
      // It was modified
      updates.push(updated);
    }
  });

  // Check new additions
  productList.forEach(detail => {
    if (!detail.Id) {
      // No ID means it’s new
      const newDetail = {
        Id_venta: Number(saleId),
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
          UPDATE "VentasDetalles"
          SET "Cantidad" = ${detail.Cantidad}
          WHERE "Id" = ${detail.Id}
        `
      ),

      // Delete removed records
      ...deletions.map(id =>
        sql`
          DELETE FROM "VentasDetalles"
          WHERE "Id" = ${id}
        `
      ),

      // Insert new records
      ...creations.map(detail =>
        sql`
          INSERT INTO "VentasDetalles" ("Id_producto", "Precio_venta", "Precio_compra", "Cantidad", "Cambio_dolar", "Id_venta")
          VALUES (${detail.Id_producto}, ${detail.Precio_venta}, ${detail.Precio_compra}, ${detail.Cantidad}, ${detail.Cambio_dolar}, ${detail.Id_venta})
        `
      )
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("No se pudieron procesar los detalles de la venta")
  }
}