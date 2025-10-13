import { sql } from '@/app/lib/db';

export async function getRegisterPages(query, whereFragment, limit, options) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM ${sql(options.tableName)}
      WHERE (${whereFragment}) ILIKE unaccent(${`%${query}%`})
    `;
    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}

export async function getReceiptsPages(query, limit) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Recibos"
      JOIN "Clientes" ON "Recibos"."Id_cliente" = "Clientes"."Id"
      WHERE (
        "Recibos"."Fecha"::text || ' ' ||
        "Recibos"."Id"::text || ' ' ||
        "Recibos"."Id_pedido"::text || ' ' ||
        unaccent("Clientes"."Nombre") || ' ' ||
        unaccent("Clientes"."Apellido")
      ) ILIKE unaccent(${`%${query}%`})
    `;
    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    throw new Error(
      'No se pudo obtener la cantidad de páginas, por favor intenta de nuevo.'
    );
  }
}

export async function getPurchasesPages(query, limit) {
  try {
    const data = await sql`
      WITH
        CompraTotalesVenta AS (
          SELECT
            "Id_compra",
            SUM("Precio_venta" * "Cantidad") AS "TotalCompraVenta"
          FROM "ComprasDetalles"
          GROUP BY "Id_compra"
        ),
        GastosTotales AS (
          SELECT
            "Id_compra",
            SUM("Gasto") AS "TotalGasto"
          FROM "Egresos"
          GROUP BY "Id_compra"
        )

      SELECT COUNT(*)
      FROM
        "Compras"
        JOIN "Proveedores" ON "Compras"."Id_proveedor" = "Proveedores"."Id"
        LEFT JOIN CompraTotalesVenta ON "Compras"."Id" = CompraTotalesVenta."Id_compra"
        LEFT JOIN GastosTotales ON "Compras"."Id" = GastosTotales."Id_compra"
        
      WHERE
      (
        "Compras"."Id"::text || ' ' ||
        unaccent("Proveedores"."Nombre_empresa") || ' ' ||
        TO_CHAR("Compras"."Fecha", 'YYYY-MM-DD')
      ) ILIKE unaccent(${`%${query}%`})
    `;

    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener las compras');
  }
}

export async function getOrdersPages(query, state, limit) {
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
        ReciboTotales AS (
          SELECT
            "Id_pedido",
            SUM("Abono") AS "TotalAbono"
          FROM "Recibos"
          GROUP BY "Id_pedido"
        )

      SELECT COUNT(*)
      FROM
        "Pedidos"
        JOIN "Clientes" ON "Pedidos"."Id_cliente" = "Clientes"."Id"
        LEFT JOIN PedidoTotalesVenta ON "Pedidos"."Id" = PedidoTotalesVenta."Id_pedido"
        LEFT JOIN ReciboTotales ON "Pedidos"."Id" = ReciboTotales."Id_pedido"
        
      WHERE
      (
        (
          "Pedidos"."Id"::text || ' ' ||
          unaccent("Clientes"."Nombre") || ' ' ||
          unaccent("Clientes"."Apellido") || ' ' ||
          TO_CHAR("Pedidos"."Fecha", 'YYYY-MM-DD')
        ) ILIKE unaccent(${`%${query}%`})
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
    `;

    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    throw new Error('No se pudieron obtener los pedidos');
  }
}

export async function getExpensesPages(query, limit) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Egresos"
      JOIN "Proveedores" ON "Egresos"."Id_proveedor" = "Proveedores"."Id"
      WHERE (
        "Egresos"."Id_compra"::text || ' ' ||
        unaccent("Proveedores"."Nombre_empresa") || ' ' ||
        "Egresos"."Id"::text || ' ' ||
        "Egresos"."Fecha"::text || ' ' ||
        unaccent("Egresos"."Concepto")
      ) ILIKE unaccent(${`%${query}%`})
    `;
    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    throw new Error('No se pudieron obtener los gastos');
  }
}

export async function getProductsPages(
  query,
  limit,
  inventario = false,
  showAll = true
) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Productos"
      WHERE (
        (
          "Id"::text || ' ' ||
          unaccent("Nombre") || ' ' ||
          "Fecha"::text
        ) ILIKE unaccent(${`%${query}%`})
      )
      ${showAll ? sql`` : sql`AND "Inventario" = ${inventario}`}
    `;
    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}

export async function getInventoryPages(query, state, limit) {
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

      SELECT COUNT(*)

      FROM
        "Productos"
        LEFT JOIN ComprasTotalesCantidad ON "Productos"."Id" = ComprasTotalesCantidad."Id_producto"
        LEFT JOIN VentasTotalesCantidad ON "Productos"."Id" = VentasTotalesCantidad."Id_producto"

      WHERE
      (
        (
          "Productos"."Id"::text || ' ' ||
          unaccent("Productos"."Nombre")
        ) ILIKE unaccent(${`%${query}%`})
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
    `;

    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener el inventario');
  }
}

export async function getSalesPages(query, state, limit) {
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

      SELECT COUNT(*)
      FROM
        "Ventas"
        JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id"
        LEFT JOIN VentaTotalesVenta ON "Ventas"."Id" = VentaTotalesVenta."Id_venta"
        LEFT JOIN VentaTotalesCompra ON "Ventas"."Id" = VentaTotalesCompra."Id_venta"

      WHERE
      (
        "Ventas"."Id"::text || ' ' ||
        unaccent("Clientes"."Nombre") || ' ' ||
        unaccent("Clientes"."Apellido") || ' ' ||
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD')
      ) ILIKE unaccent(${`%${query}%`})

      ${
        state
          ? sql`AND
        (
          COALESCE(ROUND(("Ventas"."Saldo")::numeric, 2)::float, 0)::numeric
        ) > 0`
          : sql``
      }
    `;

    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    throw new Error('No se pudieron obtener las ventas');
  }
}

export async function getProductsInventarioPages(query, limit) {
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

      SELECT COUNT(*)

      FROM "Productos"
        LEFT JOIN ComprasTotalesCantidad ON "Productos"."Id" = ComprasTotalesCantidad."Id_producto"
        LEFT JOIN VentasTotalesCantidad ON "Productos"."Id" = VentasTotalesCantidad."Id_producto"

      WHERE (
        (
          "Id"::text || ' ' ||
          unaccent("Nombre") || ' ' ||
          "Fecha"::text
        ) ILIKE unaccent(${`%${query}%`})
      )
        AND "Inventario" = true
        
        AND
          (
            COALESCE(ComprasTotalesCantidad."TotalCompraCantidad", 0)::numeric -
            COALESCE(VentasTotalesCantidad."TotalVentaCantidad", 0)::numeric
          )::numeric > 0
    `;
    return Math.ceil(Number(data[0].count) / limit) || 1;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudieron obtener los productos');
  }
}
