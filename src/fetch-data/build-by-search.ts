import { SearchParamsProps } from '@/types/types';
import { AnyColumn, ilike, or } from 'drizzle-orm';

export function buildSearchFilter(
  searchParams: SearchParamsProps,
  searchFields: AnyColumn[]
) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return or(...searchFields.map((field) => ilike(field, `%${search}%`)));
}
