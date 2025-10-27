import { relations } from 'drizzle-orm/relations';
import { categorias, productos } from './schema';

export const productosRelations = relations(productos, ({ one }) => ({
  categoria: one(categorias, {
    fields: [productos.idCategoria],
    references: [categorias.id],
  }),
}));

export const categoriasRelations = relations(categorias, ({ many }) => ({
  productos: many(productos),
}));
