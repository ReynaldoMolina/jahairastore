import { SearchParamsProps } from '@/types/types';

export const ITEMS_PER_PAGE = 20;

export function buildLimitOffset(searchParams: SearchParamsProps) {
  const limitNum = Number(searchParams?.limit) || 0;
  const pageNum = Number(searchParams?.page) || 1;

  const showAllRows = limitNum === 1;

  if (showAllRows) {
    return { limit: undefined, offset: undefined };
  }

  const limit = limitNum === 0 ? ITEMS_PER_PAGE : limitNum;
  const offset = (pageNum - 1) * limit;

  return { limit, offset };
}
