import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function getCategories() {
  try {
    const data = await sql`
      SELECT * FROM "Categoria_productos"
      ORDER BY "Id_categoria" ASC
    `;
    return data;
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch data');
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
    console.error('Database error:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function updateCategory(endpoint, id, register) {
  const url = `${baseUrl}/${endpoint}/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error updating data:", error);
    return;
  }
}

const ITEMS_PER_PAGE = 20;
export async function getReceipts(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        "Ventas"."Abono",
        "Ventas"."Fecha",
        "Ventas"."Id_pedido",
        "Ventas"."Id_venta",
        TO_CHAR("Ventas"."Fecha", 'YYYY-MM-DD') AS "Fecha",
        "Clientes"."Nombre" || ' ' || "Clientes"."Apellido" AS "NombreCompleto"
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE
        "Ventas"."Fecha"::text ILIKE ${`%${query}%`} OR
        "Ventas"."Id_pedido"::text ILIKE ${`%${query}%`} OR
        "Ventas"."Id_venta"::text ILIKE ${`%${query}%`} OR
        "Clientes"."Nombre" ILIKE ${`%${query}%`} OR
        "Clientes"."Apellido" ILIKE ${`%${query}%`}
      ORDER BY "Ventas"."Id_venta" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function getReceiptsPages(query) {

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM "Ventas"
      JOIN "Clientes" ON "Ventas"."Id_cliente" = "Clientes"."Id_cliente"
      WHERE
        "Ventas"."Fecha"::text ILIKE ${`%${query}%`} OR
        "Ventas"."Id_pedido"::text ILIKE ${`%${query}%`} OR
        "Ventas"."Id_venta"::text ILIKE ${`%${query}%`} OR
        "Clientes"."Nombre" ILIKE ${`%${query}%`} OR
        "Clientes"."Apellido" ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
    return totalPages;
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch data');
  }
}