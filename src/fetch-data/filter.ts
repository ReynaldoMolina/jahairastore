export const ITEMS_PER_PAGE = 20;

export interface SearchParamsProps {
  query?: string;
  state?: string;
  limit?: string;
  page?: string;
}

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

  const limitFragment = limit ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``;

  const state = stateParam ? true : false;

  return { query, state, limit, limitFragment };
}
