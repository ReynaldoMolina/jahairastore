import { SearchParamsProps } from '@/types/types';
import { AnyColumn, ilike, or } from 'drizzle-orm';

export function buildFilterBySearch(
  searchParams: SearchParamsProps,
  searchFields: AnyColumn[]
) {
  const search = searchParams.search?.trim() || '';

  if (!search) return { search, undefined };

  const filterBySearch = or(
    ...searchFields.map((field) => ilike(field, `%${search}%`))
  );

  return { filterBySearch };
}
