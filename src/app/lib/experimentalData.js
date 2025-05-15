import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function getAllCategories() {
  try {
    const data = await sql`
      SELECT * FROM "Categoria_productos"
    `;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCategoryById(id) {
  try {
    const data = await sql`
      SELECT * FROM "Categoria_productos"
      WHERE "Id_categoria" = ${id}
    `;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
