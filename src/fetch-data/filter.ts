import { producto } from '@/database/schema/schema';
import { ITEMS_PER_PAGE } from '@/lib/items-per-page';
import { SearchParamsProps } from '@/types/types';
import { inArray } from 'drizzle-orm';

export function getUrlParams(searchParams: SearchParamsProps) {
  const query = searchParams?.query || '';
  const stateParam = searchParams?.state || false;
  const limitNum = Number(searchParams?.limit) || 0;
  const pageNum = Number(searchParams?.page) || 1;
  const showAllRows = limitNum === 1;
  const ubicacion = Number(searchParams?.ubicacion) || undefined;

  const limit = showAllRows
    ? undefined
    : limitNum === 0
    ? ITEMS_PER_PAGE
    : limitNum;

  const offset = limit ? (pageNum - 1) * limit : undefined;
  const state = stateParam ? true : false;

  return { query, state, limit, offset, ubicacion };
}

export function buildFilterInventoryByCategory(
  searchParams: SearchParamsProps
) {
  const categoriesParam =
    searchParams.categoria?.split(',').filter(Boolean) ?? [];

  const categories = categoriesParam.map(Number);

  return categories.length > 0
    ? inArray(producto.idCategoria, categories)
    : undefined;
}

export function buildFilterInventoryByCategoryPdf(categories: number[]) {
  return categories.length > 0
    ? inArray(producto.idCategoria, categories)
    : undefined;
}
