import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });
const sql = postgres(process.env.POSTGRES_URL, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
})
const ITEMS_PER_PAGE = 20;

export async function getClients(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "Id_cliente",
        "Nombre" || ' ' || "Apellido" AS "NombreCompleto",
        "Telefono"
      FROM "Clientes"
      WHERE (
        "Id_cliente"::text || ' ' ||
        "Nombre" || ' ' ||
        "Apellido" || ' ' ||
        "Telefono"
      ) ILIKE ${`%${query}%`}
      ORDER BY "Id_cliente" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes');
  }
}

export async function getClientById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Clientes"
      WHERE "Id_cliente" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el cliente');
  }
}

export async function getClientsPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Clientes"
      WHERE (
        "Id_cliente"::text || ' ' ||
        "Nombre" || ' ' ||
        "Apellido" || ' ' ||
        "Telefono"
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes');
  }
}

export async function getClientsSelect() {
  try {
    const data = await sql`
      SELECT
        "Id_cliente",
        "Nombre" || ' ' || "Apellido" AS "NombreCompleto"
      FROM "Clientes"
      ORDER BY "Nombre" ASC
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes');
  }
}

export async function getProviders(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "Id_proveedor",
        "Nombre_empresa",
        "Telefono"
      FROM "Proveedores"
      WHERE (
        "Id_proveedor"::text || ' ' ||
        "Nombre_empresa" || ' ' ||
        "Telefono"
      ) ILIKE ${`%${query}%`}
      ORDER BY "Id_proveedor" ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores');
  }
}

export async function getProviderById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Proveedores"
      WHERE
        "Id_proveedor" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor');
  }
}

export async function getProvidersPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Proveedores"
      WHERE (
        "Id_proveedor"::text || ' ' ||
        "Nombre_empresa" || ' ' ||
        "Telefono"
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores');
  }
}

export async function getProvidersSelect() {
  try {
    const data = await sql`
      SELECT
        "Id_proveedor",
        "Nombre_empresa"
      FROM "Proveedores"
      ORDER BY "Id_proveedor" ASC
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores');
  }
}

export async function getCategories(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT * FROM "Categoria_productos"
      WHERE (
        "Id_categoria"::text || ' ' ||
        "Nombre_categoria"
      ) ILIKE ${`%${query}%`}
      ORDER BY "Id_categoria" ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se puedieron obtener las categorías');
  }
}

export async function getCategoryById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Categoria_productos"
      WHERE "Id_categoria" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se puedo obtener la categoría');
  }
}

export async function getCategoriesPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Categoria_productos"
      WHERE (
        "Id_categoria"::text || ' ' ||
        "Nombre_categoria"
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener las categorías');
  }
}

export async function getCategoriesSelect() {
  try {
    const data = await sql`
      SELECT
        "Id_categoria",
        "Nombre_categoria"
      FROM "Categoria_productos"
      ORDER BY "Id_categoria" ASC
    `;
    return data;
    
  } catch (error) {
    console.log(error);
    throw new Error('No se pudieron obtener los proveedores');
  }
}

export async function getReceipts(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "Ventas"."Id_venta",
        "Ventas"."Id_pedido",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Ventas"."Abono",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCompleto"
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE (
        "Ventas"."Fecha"::text || ' ' ||
        "Ventas"."Id_venta"::text || ' ' ||
        "Ventas"."Id_pedido"::text || ' ' ||
        "Clientes"."Nombre" || ' ' ||
        "Clientes"."Apellido"
      ) ILIKE ${`%${query}%`}
      ORDER BY "Ventas"."Id_venta" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los recibos');
  }
}

export async function getReceiptById(id) {
  try {
    const data = await sql`
      SELECT
        "Ventas"."Id_venta",
        "Ventas"."Id_pedido",
        "Ventas"."Id_cliente",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Ventas"."Abono",
        "Ventas"."Saldo",
        "Ventas"."Concepto",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCompleto"
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE
        "Ventas"."Id_venta" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el recibo');
  }
}

export async function getReceiptsPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE (
        "Ventas"."Fecha"::text || ' ' ||
        "Ventas"."Id_venta"::text || ' ' ||
        "Ventas"."Id_pedido"::text || ' ' ||
        "Clientes"."Nombre" || ' ' ||
        "Clientes"."Apellido"
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los recibos');
  }
}

export async function getWebsiteProducts(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "id",
        "name",
        "price"
      FROM "ProductsPage"
      WHERE (
        "id"::text || ' ' ||
        "name" || ' ' ||
        "price"::text
      ) ILIKE ${`%${query}%`}
      ORDER BY "id" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getWebsiteProductById(id) {
  try {
    const data = await sql`
      SELECT * FROM "ProductsPage"
      WHERE
        "id" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el producto');
  }
}

export async function getWebsiteProductsPages(query) {

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "ProductsPage"
      WHERE (
        "id"::text || ' ' ||
        "name" || ' ' ||
        "price"::text
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProducts(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "Id_producto",
        "Nombre",
        "Precio_compra",
        "Precio_venta",
        "Precio_venta" - "Precio_compra" AS "Ganancia",
        TO_CHAR("Fecha_agregado", 'YYYY-MM-DD') AS "Fecha"
      FROM "Productos"
      WHERE (
        "Id_producto"::text || ' ' ||
        "Nombre" || ' ' ||
        "Fecha_agregado"::text
      ) ILIKE ${`%${query}%`}
      ORDER BY "Id_producto" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProductById(id) {
  try {
    const data = await sql`
      SELECT
        "Id_producto",
        "Id_proveedor",
        "Nombre",
        "Descripcion",
        "Precio_compra",
        "Precio_venta",
        "Id_categoria",
        TO_CHAR("Fecha_agregado", 'YYYY-MM-DD') AS "Fecha",
        "Id_shein",
        "Precio_venta" - "Precio_compra" AS "Ganancia"
      FROM "Productos"
      WHERE
        "Id_producto" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el producto');
  }
}

export async function getProductsPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Productos"
      WHERE (
        "Id_producto"::text || ' ' ||
        "Nombre" || ' ' ||
        "Fecha_agregado"::text
      ) ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getOrders(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const filterDeben = query.includes('debe');
  const newQuery = filterDeben ? query.replace(/^debe\s*/, '') : query;

  try {
    const data = await sql`
      WITH
        PedidoTotalesVenta AS (
          SELECT
            "Id_pedido",
            SUM("Precio_venta" * "Cantidad_venta") AS "TotalPedidoVenta"
          FROM "PedidosDetalles"
          GROUP BY "Id_pedido"
        ),
        PedidoTotalesCompra AS (
          SELECT
            "Id_pedido",
            SUM("Precio_compra" * "Cantidad_venta") AS "TotalPedidoCompra"
          FROM "PedidosDetalles"
          GROUP BY "Id_pedido"
        ),
        VentaTotales AS (
          SELECT
            "Id_pedido",
            SUM("Abono") AS "TotalAbono"
          FROM "Ventas"
          GROUP BY "Id_pedido"
        )

      SELECT
        "Pedidos"."Id_pedido",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCompleto",
        TO_CHAR("Pedidos"."Fecha_del_pedido", 'YYYY-MM-DD') AS "Fecha",
        COALESCE(PedidoTotalesVenta."TotalPedidoVenta", 0) AS "TotalPedidoVenta",
        COALESCE(PedidoTotalesCompra."TotalPedidoCompra", 0) AS "TotalPedidoCompra",
        COALESCE(VentaTotales."TotalAbono", 0) AS "TotalAbono"

      FROM
        "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id_cliente"
        LEFT JOIN PedidoTotalesVenta ON "Pedidos"."Id_pedido" = PedidoTotalesVenta."Id_pedido"
        LEFT JOIN PedidoTotalesCompra ON "Pedidos"."Id_pedido" = PedidoTotalesCompra."Id_pedido"
        LEFT JOIN VentaTotales ON "Pedidos"."Id_pedido" = VentaTotales."Id_pedido"

      WHERE
      (
        (
          "Pedidos"."Id_pedido"::text || ' ' ||
          "Clientes"."Nombre" || ' ' ||
          "Clientes"."Apellido" || ' ' ||
          TO_CHAR("Pedidos"."Fecha_del_pedido", 'YYYY-MM-DD')
        ) ILIKE ${`%${newQuery}%`}
      )

      ${filterDeben ? sql`AND (COALESCE(PedidoTotalesVenta."TotalPedidoVenta", 0) - COALESCE(VentaTotales."TotalAbono", 0)) > 0` : sql``}

      ORDER BY "Pedidos"."Id_pedido" DESC

      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudieron obtener los pedidos');
  }
}

export async function getOrderById(id) {
  try {
    const data = await sql`
      WITH
        AbonosTotales AS (
          SELECT
            "Id_pedido",
            SUM("Abono") AS "TotalAbono"
          FROM "Ventas"
          WHERE "Id_pedido" = ${id}
          GROUP BY "Id_pedido"
        )

      SELECT
        "Pedidos"."Id_pedido",
        "Pedidos"."Id_cliente",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCompleto",
        TO_CHAR("Pedidos"."Fecha_del_pedido", 'YYYY-MM-DD') AS "Fecha",
        "Pedidos"."Peso",
        COALESCE(AbonosTotales."TotalAbono", 0) AS "TotalAbono"

      FROM "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id_cliente"
        LEFT JOIN AbonosTotales ON "Pedidos"."Id_pedido" = AbonosTotales."Id_pedido"
      
      WHERE "Pedidos"."Id_pedido" = ${id}
    `;
    return data[0];
    
  } catch (error) {
    throw new Error('No se pudo obtener el pedido');
  }
}

export async function getOrdersPages(query) {
  const filterDeben = query.includes('debe');
  const newQuery = filterDeben ? query.replace(/^debe\s*/, '') : query;

  try {
    const data = await sql`
      WITH
        PedidoTotalesVenta AS (
          SELECT
            "Id_pedido",
            SUM("Precio_venta" * "Cantidad_venta") AS "TotalPedidoVenta"
          FROM "PedidosDetalles"
          GROUP BY "Id_pedido"
        ),
        VentaTotales AS (
          SELECT
            "Id_pedido",
            SUM("Abono") AS "TotalAbono"
          FROM "Ventas"
          GROUP BY "Id_pedido"
        )

      SELECT COUNT(*)
      FROM
        "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id_cliente"
        LEFT JOIN PedidoTotalesVenta ON "Pedidos"."Id_pedido" = PedidoTotalesVenta."Id_pedido"
        LEFT JOIN VentaTotales ON "Pedidos"."Id_pedido" = VentaTotales."Id_pedido"
        
      WHERE
      (
        (
          "Pedidos"."Id_pedido"::text || ' ' ||
          "Clientes"."Nombre" || ' ' ||
          "Clientes"."Apellido" || ' ' ||
          TO_CHAR("Pedidos"."Fecha_del_pedido", 'YYYY-MM-DD')
        ) ILIKE ${`%${newQuery}%`}
      )

      ${filterDeben ? sql`AND (COALESCE(PedidoTotalesVenta."TotalPedidoVenta", 0) - COALESCE(VentaTotales."TotalAbono", 0)) > 0` : sql``}
    `;
    
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    throw new Error('No se pudieron obtener las órdenes');
  }
}

export async function getOrderDetailById(id) {
  try {
    const data = await sql`
      SELECT
        "PedidosDetalles"."Id_detalle",
        "PedidosDetalles"."Id_pedido",
        "PedidosDetalles"."Id_producto",
        "PedidosDetalles"."Precio_venta",
        "PedidosDetalles"."Precio_compra",
        "PedidosDetalles"."Cantidad_venta",
        "Productos"."Nombre"
      FROM "PedidosDetalles"
        JOIN "Productos" ON "PedidosDetalles"."Id_producto" = "Productos"."Id_producto"
      WHERE "Id_pedido" = ${id}
    `;
    return data;
    
  } catch (error) {
    throw new Error('No se pudo obtener el detalle del pedido');
  }
}

export async function getReceiptPdf(id) {
  try {
    const order = await sql`
      SELECT
        "Ventas"."Id_venta",
        "Ventas"."Id_pedido",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Ventas"."Abono",
        "Ventas"."Saldo",
        "Clientes"."Nombre",
        "Clientes"."Apellido"
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE
        "Ventas"."Id_venta" = ${id}
    `;
    
    const orderId = order[0].Id_pedido;

    const orderdetail = await sql`
      SELECT
        "PedidosDetalles"."Precio_venta",
        "PedidosDetalles"."Cantidad_venta",
        "Productos"."Nombre"
      FROM "PedidosDetalles"
        JOIN "Productos" ON "PedidosDetalles"."Id_producto" = "Productos"."Id_producto"
      WHERE "Id_pedido" = ${orderId}
    `;

    const data = {
      ...order[0],
      detail: orderdetail
    };

    return data;
    
  } catch (error) {
    throw new Error('No se pudo obtener el recibo');
  }
}