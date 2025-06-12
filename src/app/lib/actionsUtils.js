'use server';

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function goBackTo(path) {
  revalidatePath(path);
  redirect(path);
}

export async function createRecord({ tableName, columns, data, returningId = false }) {
  const values = columns.map(col => data[col]);

  let query = sql`
    INSERT INTO ${sql(tableName)}
    (${sql(columns)})
    VALUES ${sql(values)}
  `;

  if (returningId) {
    query = sql`
      INSERT INTO ${sql(tableName)}
      (${sql(columns)})
      VALUES ${sql(values)}
      RETURNING "Id"
    `;
  }

  try {
    if (returningId) {
      const result = await query;
      return result[0].Id;
    } else {
      await query;
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el registro');
  }
}

export async function updateRecord({ tableName, id, data }) {
  const setClauses = []; // This will store strings like '"Column" = $1'
  const values = [];     // This will store the actual data values
  let paramIndex = 1;    // To keep track of our parameter placeholders ($1, $2, etc.)

  for (const key in data) {
    // Ensure the property belongs to the object and isn't 'Id' (which is for WHERE)
    if (data.hasOwnProperty(key) && key !== 'Id') {
      setClauses.push(`"${key}" = $${paramIndex}`); // Add ' "Column" = $N ' to the clause array
      values.push(data[key]);                        // Add the actual value to the values array
      paramIndex++;                                  // Increment for the next parameter
    }
  }

  // If no data is provided, there's nothing to update. Handle this case.
  if (setClauses.length === 0) {
    console.warn("No fields provided for update. Skipping update operation.");
    return { affectedRows: 0 }; // Or throw an error if this should not happen
  }

  // Add the 'id' for the WHERE clause as the last parameter
  values.push(id);
  const idParam = `$${paramIndex}`; // The placeholder for the ID in the WHERE clause

  try {
    const result = await sql`
      UPDATE ${sql(tableName)}
      SET ${sql.join(setClauses, ', ')}
      WHERE "Id" = ${sql(idParam)}
    `;
    // The 'sql' client often returns a result object, check its structure
    // For postgres.js, `result.count` typically holds the number of affected rows.
    return result;
  } catch (error) {
    console.error("Error updating record:", error);
    // You can inspect the error object for more details if needed
    throw new Error('No se pudo actualizar el registro');
  }
}

export async function createRecordDetail({ tableName, recordId, columns, productList }) {
  try {
    await Promise.all(productList.map(product => {
      let values = columns.map(col => product[col]);
      values[0] = recordId;
  
      return sql`
        INSERT INTO ${sql(tableName)}
        (${sql(columns)})
        VALUES ${sql(values)}
      `;
    }))
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo crear el detalle del registro");
  }
}

export async function updateDetailRecords({
  foreignKeyName,
  foreignKeyValue,
  tableName,
  productList,
  originalList,
  insertColumns, // array of column names
}) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications and deletions
  originalList.forEach(original => {
    const updated = productList.find(item => item.Id === original.Id);

    if (!updated) {
      deletions.push(original.Id);
    } else if (updated.Cantidad !== original.Cantidad) {
      updates.push(updated);
    }
  });

  // Check new records
  productList.forEach(item => {
    if (!item.Id) {
      const newItem = {
        [foreignKeyName]: foreignKeyValue,
        ...item,
      };
      creations.push(newItem);
    }
  });

  try {
    await Promise.all([
      // Update
      ...updates.map(item =>
        sql`
          UPDATE ${sql(tableName)}
          SET "Cantidad" = ${item.Cantidad}
          WHERE "Id" = ${item.Id}
        `
      ),

      // Delete
      ...deletions.map(id =>
        sql`
          DELETE FROM ${sql(tableName)}
          WHERE "Id" = ${id}
        `
      ),

      // Insert
      ...creations.map(item => {
        const columns = [foreignKeyName, ...insertColumns];
        const values = columns.map(col => item[col]);

        return sql`
          INSERT INTO ${sql(tableName)}
          (${sql(columns)})
          VALUES ${sql(values)}
        `;
      })
    ]);

  } catch (error) {
    console.error(error);
    throw new Error("No se pudieron procesar los detalles");
  }
}
