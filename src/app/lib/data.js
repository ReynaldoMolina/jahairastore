import { sql } from '@/app/lib/db';
import { getUrlParams } from './filter';
import {
  getPurchasesPages,
  getRegisterPages,
  getReceiptsPages,
  getOrdersPages,
  getExpensesPages,
  getProductsPages,
  getInventoryPages,
  getSalesPages,
  getProductsInventarioPages,
} from './dataPages';

const registerOptions = {
  categorias: {
    tableName: 'Categorias',
    selectColumns: ['Id', 'Nombre'],
    searchColumns: ['Nombre'],
  },
  proveedores: {
    tableName: 'Proveedores',
    selectColumns: ['Id', 'Nombre_empresa', 'Telefono'],
    searchColumns: ['Nombre_empresa'],
  },
  clientes: {
    tableName: 'Clientes',
    selectColumns: ['Id', 'Nombre', 'Apellido', 'Telefono'],
    searchColumns: ['Nombre', 'Apellido'],
  },
};

export async function getRegisters(listName, searchParams) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);
  const options = registerOptions[listName];

  const whereFragment = options.searchColumns.flatMap((col, i) => [
    i ? sql` || ' ' || ` : sql``,
    sql`${sql(col)}`,
  ]);

  try {
    const data = await sql`
      SELECT ${sql(options.selectColumns)}
      FROM ${sql(options.tableName)}
      WHERE (${whereFragment}) ILIKE ${`%${query}%`}
      ORDER BY "Id" DESC
      ${limitFragment}
    `;
    const totalPages = await getRegisterPages(
      query,
      whereFragment,
      limit,
      options
    );
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los registros, por favor intenta de nuevo.'
    );
  }
}

export async function getClientById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Clientes"
      WHERE "Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se pudo obtener el cliente');
  }
}

export async function getClientsSelect() {
  try {
    const data = await sql`
      SELECT
        "Id",
        "Nombre" || ' ' || "Apellido" AS "Nombre"
      FROM "Clientes"
      ORDER BY "Nombre" ASC
    `;
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los clientes');
  }
}

export async function getProviderById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Proveedores"
      WHERE
        "Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se pudo obtener el proveedor');
  }
}

export async function getProvidersSelect() {
  try {
    const data = await sql`
      SELECT
        "Id",
        "Nombre_empresa" AS "Nombre"
      FROM "Proveedores"
      ORDER BY "Id" ASC
    `;
    return data;
  } catch (error) {
    throw new Error('No se pudieron obtener los proveedores');
  }
}

export async function getCategoryById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Categorias"
      WHERE "Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se puedo obtener la categoría');
  }
}

export async function getCategoriesSelect() {
  try {
    const data = await sql`
      SELECT
        "Id",
        "Nombre"
      FROM "Categorias"
      ORDER BY "Id" ASC
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las categorías');
  }
}

export async function getReceipts(searchParams) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      SELECT
        "Recibos"."Id",
        "Recibos"."Id_pedido",
        TO_CHAR("Recibos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Recibos"."Abono",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCliente"
      FROM "Recibos"
      JOIN "Clientes" ON "Recibos"."Id_cliente" = "Clientes"."Id"
      WHERE (
        "Recibos"."Fecha"::text || ' ' ||
        "Recibos"."Id"::text || ' ' ||
        "Recibos"."Id_pedido"::text || ' ' ||
        "Clientes"."Nombre" || ' ' ||
        "Clientes"."Apellido"
      ) ILIKE ${`%${query}%`}
      ORDER BY "Recibos"."Id" DESC
      ${limitFragment}
    `;
    const totalPages = await getReceiptsPages(query, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los recibos');
  }
}

export async function getReceiptById(id) {
  try {
    const data = await sql`
      SELECT
        "Recibos"."Id",
        "Recibos"."Id_pedido",
        "Recibos"."Id_cliente",
        TO_CHAR("Recibos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Recibos"."Abono",
        "Recibos"."Saldo",
        "Recibos"."Concepto",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCliente"
      FROM "Recibos"
      JOIN "Clientes" ON "Recibos"."Id_cliente" = "Clientes"."Id"
      WHERE
        "Recibos"."Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se pudo obtener el recibo');
  }
}

export async function getProducts(
  searchParams,
  inventario = false,
  ShowAll = true
) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      SELECT
        "Id",
        "Nombre",
        "Precio_compra",
        "Precio_venta",
        "Precio_venta" - "Precio_compra" AS "Ganancia",
        TO_CHAR("Fecha", 'YYYY-MM-DD') AS "Fecha"
      FROM "Productos"
      WHERE (
        (
          "Id"::text || ' ' ||
          "Nombre" || ' ' ||
          "Fecha"::text
        ) ILIKE ${`%${query}%`}
      )
      ${ShowAll ? sql`` : sql`AND "Inventario" = ${inventario}`}

      ORDER BY "Id" DESC
      ${limitFragment}
    `;
    const totalPages = await getProductsPages(
      query,
      limit,
      inventario,
      ShowAll
    );
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProductsInventario(searchParams, showAll) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      WITH
        ComprasTotalesCantidad AS (
          SELECT
          "Id_producto",
          SUM("Cantidad")::int AS "TotalCompraCantidad"
        FROM "ComprasDetalles"
        GROUP BY "Id_producto"
        ),
        VentasTotalesCantidad AS (
          SELECT
            "Id_producto",
            SUM("Cantidad")::int AS "TotalVentaCantidad"
          FROM "VentasDetalles"
          GROUP BY "Id_producto"
        )

      SELECT
        "Id",
        "Nombre",
        "Precio_compra",
        "Precio_venta",
        "Cambio_dolar",
        COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0) - COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0) AS "Existencias"

      FROM "Productos"
        LEFT JOIN ComprasTotalesCantidad ON "Productos"."Id" = ComprasTotalesCantidad."Id_producto"
        LEFT JOIN VentasTotalesCantidad ON "Productos"."Id" = VentasTotalesCantidad."Id_producto"

      WHERE (
        (
          "Id"::text || ' ' ||
          "Nombre" || ' ' ||
          "Fecha"::text
        ) ILIKE ${`%${query}%`}
      )
        AND "Inventario" = true

        ${
          showAll
            ? sql``
            : sql`AND
          (
            COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0)::numeric -
            COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0)::numeric
          )::numeric > 0`
        }

      ORDER BY "Id" DESC

      ${limitFragment}
    `;
    const totalPages = await getProductsInventarioPages(query, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getProductById(id) {
  try {
    const data = await sql`
      SELECT
        "Id",
        "Id_proveedor",
        "Id_categoria",
        "Nombre",
        "Descripcion",
        "Precio_compra",
        "Precio_venta",
        "Id",
        "Inventario",
        "Cambio_dolar",
        TO_CHAR("Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Id_shein",
        "Precio_venta" - "Precio_compra" AS "Ganancia"
      FROM "Productos"
      WHERE
        "Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se pudo obtener el producto');
  }
}

export async function getOrders(searchParams) {
  const { query, state, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      WITH
        PedidoTotalesVenta AS (
          SELECT
            "Id_pedido",
            SUM("Precio_venta" * "Cantidad") AS "TotalPedidoVenta"
          FROM "PedidosDetalles"
          GROUP BY "Id_pedido"
        ),
        PedidoTotalesCompra AS (
          SELECT
            "Id_pedido",
            SUM("Precio_compra" * "Cantidad") AS "TotalPedidoCompra"
          FROM "PedidosDetalles"
          GROUP BY "Id_pedido"
        ),
        ReciboTotales AS (
          SELECT
            "Id_pedido",
            SUM("Abono") AS "TotalAbono"
          FROM "Recibos"
          GROUP BY "Id_pedido"
        )

      SELECT
        "Pedidos"."Id",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCliente",
        TO_CHAR("Pedidos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        COALESCE(PedidoTotalesVenta."TotalPedidoVenta", 0) AS "TotalPedidoVenta",
        COALESCE(PedidoTotalesCompra."TotalPedidoCompra", 0) AS "TotalPedidoCompra",
        COALESCE(ReciboTotales."TotalAbono", 0) AS "TotalAbono"

      FROM
        "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id"
        LEFT JOIN PedidoTotalesVenta ON "Pedidos"."Id" = PedidoTotalesVenta."Id_pedido"
        LEFT JOIN PedidoTotalesCompra ON "Pedidos"."Id" = PedidoTotalesCompra."Id_pedido"
        LEFT JOIN ReciboTotales ON "Pedidos"."Id" = ReciboTotales."Id_pedido"

      WHERE
      (
        (
          "Pedidos"."Id"::text || ' ' ||
          "Clientes"."Nombre" || ' ' ||
          "Clientes"."Apellido" || ' ' ||
          TO_CHAR("Pedidos"."Fecha", 'YYYY-MM-DD')
        ) ILIKE ${`%${query}%`}
      )

      ${
        state
          ? sql`AND ROUND(
        COALESCE(PedidoTotalesVenta."TotalPedidoVenta", 0)::numeric -
        COALESCE(ReciboTotales."TotalAbono", 0)::numeric,
        2
      )::double precision > 0`
          : sql``
      }

      ORDER BY "Pedidos"."Id" DESC

      ${limitFragment}
    `;
    const totalPages = await getOrdersPages(query, state, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
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
          FROM "Recibos"
          WHERE "Id_pedido" = ${id}
          GROUP BY "Id_pedido"
        )

      SELECT
        "Pedidos"."Id",
        "Pedidos"."Id_cliente",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCliente",
        "Clientes"."Nombre",
        "Clientes"."Telefono",
        TO_CHAR("Pedidos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Pedidos"."Peso",
        COALESCE("Pedidos"."Cambio_dolar", 0) AS "Cambio_dolar",
        COALESCE("Pedidos"."Precio_libra", 0) AS "Precio_libra",
        COALESCE(AbonosTotales."TotalAbono", 0) AS "TotalAbono"

      FROM "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id"
        LEFT JOIN AbonosTotales ON "Pedidos"."Id" = AbonosTotales."Id_pedido"
      
      WHERE "Pedidos"."Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error(error);

    throw new Error('No se pudo obtener el pedido');
  }
}

export async function getOrderDetailById(id) {
  try {
    const data = await sql`
      SELECT
        "PedidosDetalles"."Id",
        "PedidosDetalles"."Id_pedido",
        "PedidosDetalles"."Id_producto",
        "PedidosDetalles"."Precio_venta",
        "PedidosDetalles"."Precio_compra",
        "PedidosDetalles"."Cantidad",
        "Productos"."Nombre"
      FROM "PedidosDetalles"
        JOIN "Productos" ON "PedidosDetalles"."Id_producto" = "Productos"."Id"
      WHERE "Id_pedido" = ${id}
      ORDER BY "Productos"."Id" DESC
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle del pedido');
  }
}

export async function getReceiptPdf(id) {
  try {
    const order = await sql`
      SELECT
        "Recibos"."Id",
        "Recibos"."Id_pedido",
        TO_CHAR("Recibos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Recibos"."Abono",
        "Recibos"."Saldo",
        "Recibos"."Id_cliente",
        "Clientes"."Nombre",
        "Clientes"."Apellido"
      FROM "Recibos"
      JOIN "Clientes" ON "Recibos"."Id_cliente" = "Clientes"."Id"
      WHERE
        "Recibos"."Id" = ${id}
    `;

    const orderId = order[0].Id_pedido;

    const orderdetail = await sql`
      SELECT
        "PedidosDetalles"."Precio_venta",
        "PedidosDetalles"."Cantidad",
        "Productos"."Nombre"
      FROM "PedidosDetalles"
        JOIN "Productos" ON "PedidosDetalles"."Id_producto" = "Productos"."Id"
      WHERE "Id_pedido" = ${orderId}
    `;

    const data = {
      ...order[0],
      detail: orderdetail,
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el recibo');
  }
}

export async function getPurchases(searchParams) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      WITH
        CompraTotalesVenta AS (
          SELECT
            "Id_compra",
            SUM("Precio_venta" * "Cantidad" * "Cambio_dolar") AS "TotalCompraVenta"
          FROM "ComprasDetalles"
          GROUP BY "Id_compra"
        ),
        CompraTotalesCompra AS (
          SELECT
            "Id_compra",
            SUM("Precio_compra" * "Cantidad" * "Cambio_dolar") AS "TotalCompraCompra"
          FROM "ComprasDetalles"
          GROUP BY "Id_compra"
        ),
        GastosTotales AS (
          SELECT
            "Id_compra",
            SUM("Gasto" * "Cambio_dolar") AS "TotalGasto"
          FROM "Egresos"
          GROUP BY "Id_compra"
        )

      SELECT
        "Compras"."Id",
        "Proveedores"."Nombre_empresa",
        TO_CHAR("Compras"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        COALESCE(CompraTotalesVenta."TotalCompraVenta", 0) AS "TotalCompraVenta",
        COALESCE(CompraTotalesCompra."TotalCompraCompra", 0) AS "TotalCompraCompra",
        COALESCE(GastosTotales."TotalGasto", 0) AS "TotalGasto"

      FROM
        "Compras"
        JOIN "Proveedores" ON "Compras"."Id_proveedor" = "Proveedores"."Id"
        LEFT JOIN CompraTotalesVenta ON "Compras"."Id" = CompraTotalesVenta."Id_compra"
        LEFT JOIN CompraTotalesCompra ON "Compras"."Id" = CompraTotalesCompra."Id_compra"
        LEFT JOIN GastosTotales ON "Compras"."Id" = GastosTotales."Id_compra"

      WHERE
      (
        "Compras"."Id"::text || ' ' ||
        "Proveedores"."Nombre_empresa" || ' ' ||
        TO_CHAR("Compras"."Fecha", 'YYYY-MM-DD')
      ) ILIKE ${`%${query}%`}

      ORDER BY "Compras"."Id" DESC

      ${limitFragment}
    `;
    const totalPages = await getPurchasesPages(query, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las compras');
  }
}

export async function getPurchaseById(id) {
  try {
    const data = await sql`
      WITH
        GastosTotales AS (
          SELECT
            "Id_compra",
            SUM("Gasto" * "Cambio_dolar") AS "TotalGasto"
          FROM "Egresos"
          WHERE "Id_compra" = ${id}
          GROUP BY "Id_compra"
        )

      SELECT
        "Compras"."Id",
        "Compras"."Id_proveedor",
        TO_CHAR("Compras"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Proveedores"."Nombre_empresa",
        COALESCE(GastosTotales."TotalGasto", 0) AS "TotalGasto"

      FROM "Compras"
        JOIN "Proveedores" ON "Compras"."Id_proveedor" = "Proveedores"."Id"
        LEFT JOIN GastosTotales ON "Compras"."Id" = GastosTotales."Id_compra"
      
      WHERE "Compras"."Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la compra');
  }
}

export async function getPurchaseDetailById(id) {
  try {
    const data = await sql`
      SELECT
        "ComprasDetalles"."Id",
        "ComprasDetalles"."Id_compra",
        "ComprasDetalles"."Id_producto",
        "ComprasDetalles"."Precio_compra",
        "ComprasDetalles"."Cantidad",
        "ComprasDetalles"."Precio_venta",
        "ComprasDetalles"."Cambio_dolar",
        "Productos"."Nombre"
      FROM "ComprasDetalles"
        JOIN "Productos" ON "ComprasDetalles"."Id_producto" = "Productos"."Id"
      WHERE "Id_compra" = ${id}
    `;
    return data;
  } catch (error) {
    throw new Error('No se pudo obtener el detalle de la compra');
  }
}

export async function getExpenseById(id) {
  try {
    const data = await sql`
      SELECT
        "Egresos"."Id",
        "Egresos"."Id_compra",
        "Egresos"."Id_proveedor",
        TO_CHAR("Egresos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Egresos"."Gasto",
        "Egresos"."Concepto",
        "Egresos"."Cambio_dolar"
      FROM "Egresos"
      JOIN "Proveedores" ON "Egresos"."Id_proveedor" = "Proveedores"."Id"
      WHERE
        "Egresos"."Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    throw new Error('No se pudo obtener el gasto');
  }
}

export async function getExpenses(searchParams) {
  const { query, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      SELECT
        "Egresos"."Id",
        "Egresos"."Id_compra",
        "Proveedores"."Nombre_empresa",
        TO_CHAR("Egresos"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Egresos"."Gasto",
        "Egresos"."Concepto",
        "Egresos"."Cambio_dolar"

      FROM "Egresos"

      JOIN "Proveedores" ON "Egresos"."Id_proveedor" = "Proveedores"."Id"

      WHERE (
        "Egresos"."Id_compra"::text || ' ' ||
        "Proveedores"."Nombre_empresa" || ' ' ||
        "Egresos"."Id"::text || ' ' ||
        "Egresos"."Fecha"::text
      ) ILIKE ${`%${query}%`}

      ORDER BY "Egresos"."Id" DESC
      ${limitFragment}
    `;
    const totalPages = await getExpensesPages(query, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los gastos');
  }
}

export async function getSales(searchParams) {
  const { query, state, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      WITH
        VentaTotalesVenta AS (
          SELECT
            "Id_venta",
            SUM("Precio_venta" * "Cantidad" * "Cambio_dolar") AS "TotalVenta"
          FROM "VentasDetalles"
          GROUP BY "Id_venta"
        ),
        VentaTotalesCompra AS (
          SELECT
            "Id_venta",
            SUM("Precio_compra" * "Cantidad" * "Cambio_dolar") AS "TotalCompra"
          FROM "VentasDetalles"
          GROUP BY "Id_venta"
        )

      SELECT
        "Ventas"."Id",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCliente",
        "Ventas"."Abono",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        COALESCE(VentaTotalesVenta."TotalVenta", 0) AS "TotalVenta",
        COALESCE(VentaTotalesCompra."TotalCompra", 0) AS "TotalCompra",
        COALESCE(VentaTotalesVenta."TotalVenta", 0) - "Ventas"."Abono" AS "Saldo"

      FROM
        "Ventas"
        JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id"
        LEFT JOIN VentaTotalesVenta ON "Ventas"."Id" = VentaTotalesVenta."Id_venta"
        LEFT JOIN VentaTotalesCompra ON "Ventas"."Id" = VentaTotalesCompra."Id_venta"

      WHERE
      (
        "Ventas"."Id"::text || ' ' ||
        "Clientes"."Nombre" || ' ' ||
        "Clientes"."Apellido" || ' ' ||
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD')
      ) ILIKE ${`%${query}%`}

      ${
        state
          ? sql`AND
        (
          COALESCE(VentaTotalesVenta."TotalVenta", 0)::numeric - COALESCE("Ventas"."Abono", 0)::numeric
        )::numeric > 0.01`
          : sql``
      }

      ORDER BY "Ventas"."Id" DESC

      ${limitFragment}
    `;
    const totalPages = await getSalesPages(query, state, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las ventas');
  }
}

export async function getSaleById(id) {
  try {
    const data = await sql`
      SELECT
        "Ventas"."Id",
        "Ventas"."Id_cliente",
        "Ventas"."Abono",
        "Ventas"."Credito",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha"

      FROM "Ventas"
        JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id"
      
      WHERE "Ventas"."Id" = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la venta');
  }
}

export async function getSaleDetailById(id) {
  try {
    const data = await sql`
    WITH
        ComprasTotalesCantidad AS (
          SELECT
          "Id_producto",
          SUM("Cantidad")::int AS "TotalCompraCantidad"
        FROM "ComprasDetalles"
        GROUP BY "Id_producto"
        ),
        VentasTotalesCantidad AS (
          SELECT
            "Id_producto",
            SUM("Cantidad")::int AS "TotalVentaCantidad"
          FROM "VentasDetalles"
          GROUP BY "Id_producto"
        )

      SELECT
        "VentasDetalles"."Id",
        "VentasDetalles"."Id_producto",
        "Productos"."Nombre",
        "VentasDetalles"."Precio_venta",
        "VentasDetalles"."Precio_compra",
        "VentasDetalles"."Cantidad",
        "VentasDetalles"."Cambio_dolar",
        "VentasDetalles"."Id_venta",
        COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0) - COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0) AS "Existencias"
      FROM "VentasDetalles"
        JOIN "Productos" ON "VentasDetalles"."Id_producto" = "Productos"."Id"
        LEFT JOIN ComprasTotalesCantidad ON "VentasDetalles"."Id_producto" = ComprasTotalesCantidad."Id_producto"
        LEFT JOIN VentasTotalesCantidad ON "VentasDetalles"."Id_producto" = VentasTotalesCantidad."Id_producto"

      WHERE "Id_venta" = ${id}
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el detalle de la venta');
  }
}

export async function getInventory(searchParams) {
  const { query, state, limit, limitFragment } = getUrlParams(searchParams);

  try {
    const data = await sql`
      WITH
        ComprasTotalesCantidad AS (
          SELECT
          "Id_producto",
          SUM("Cantidad")::int AS "TotalCompraCantidad"
        FROM "ComprasDetalles"
        GROUP BY "Id_producto"
        ),
        VentasTotalesCantidad AS (
          SELECT
            "Id_producto",
            SUM("Cantidad")::int AS "TotalVentaCantidad"
          FROM "VentasDetalles"
          GROUP BY "Id_producto"
        )

      SELECT
        "Productos"."Id",
        "Productos"."Nombre",
        "Productos"."Precio_venta" * "Productos"."Cambio_dolar" AS "Precio_venta",
        "Productos"."Precio_compra" * "Productos"."Cambio_dolar" AS "Precio_compra",
        COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0) AS "TotalCompraCantidad",
        COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0) AS "TotalVentaCantidad",
        COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0) - COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0) AS "Existencias",
        (
          (
            COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0) - COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0)
          ) * ("Productos"."Precio_venta" - "Productos"."Precio_compra")
        ) * "Productos"."Cambio_dolar" AS "Ganancia"

      FROM
        "Productos"
        LEFT JOIN ComprasTotalesCantidad ON "Productos"."Id" = ComprasTotalesCantidad."Id_producto"
        LEFT JOIN VentasTotalesCantidad ON "Productos"."Id" = VentasTotalesCantidad."Id_producto"

      WHERE
      (
        (
          "Productos"."Id"::text || ' ' ||
          "Productos"."Nombre"
        ) ILIKE ${`%${query}%`}
      )
        AND "Productos"."Inventario" = true

      ${
        state
          ? sql`AND
        (
          COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0)::numeric -
          COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0)::numeric
        )::numeric > 0`
          : sql``
      }

      ORDER BY "Productos"."Nombre" ASC

      ${limitFragment}
    `;
    const totalPages = await getInventoryPages(query, state, limit);
    return { data, query, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el inventario');
  }
}

export async function getBusinessData() {
  try {
    const data = await sql`
      SELECT 
        "Nombre_empresa",
        "Eslogan",
        "Mensaje"
      FROM "Configuracion"
      WHERE "Id" = ${1}
    `;
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la información del negocio');
  }
}
