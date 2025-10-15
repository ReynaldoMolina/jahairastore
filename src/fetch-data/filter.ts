import { sql } from '@/database/db';

export const ITEMS_PER_PAGE = 20;

export function getUrlParams(searchParams) {
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
  const limitFragment = limit ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``;

  const state = stateParam ? true : false;

  return { query, state, limit, limitFragment };
}
