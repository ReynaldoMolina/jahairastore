import { ITEMS_PER_PAGE } from '@/lib/items-per-page';
import { SearchParamsProps } from '@/types/types';

export function getUrlParams(searchParams: SearchParamsProps) {
  const query = searchParams?.query || '';
  const stateParam = searchParams?.state || false;
  const limitNum = Number(searchParams?.limit) || 0;
  const pageNum = Number(searchParams?.page) || 1;
  const showAllRows = limitNum === 1;

  const limit = showAllRows
    ? undefined
    : limitNum === 0
    ? ITEMS_PER_PAGE
    : limitNum;

  const offset = limit ? (pageNum - 1) * limit : undefined;
  const state = stateParam ? true : false;

  return { query, state, limit, offset };
}
