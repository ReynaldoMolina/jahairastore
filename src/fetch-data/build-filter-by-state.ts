import { SearchParamsProps } from '@/types/types';

export function buildFilterByState(
  searchParams: SearchParamsProps,
  fieldName: string
) {
  const stateParam = searchParams?.state || false;
  return stateParam ? true : false;
}
