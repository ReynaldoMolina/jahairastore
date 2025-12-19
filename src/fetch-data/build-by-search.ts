import { cliente, gasto, proveedor, recibo } from '@/database/schema/schema';
import { SearchParamsProps } from '@/types/types';
import { AnyColumn, or, sql } from 'drizzle-orm';

export function buildSearchFilter(
  searchParams: SearchParamsProps,
  searchFields: AnyColumn[]
) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return or(
    ...searchFields.map(
      (field) => sql`unaccent(${field}) ILIKE unaccent(${`%${search}%`})`
    )
  );
}

export function buildSearchFilterByClient(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${cliente.nombre} || ' ' || ${cliente.apellido})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}

export function buildSearchFilterByProvider(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${proveedor.nombreEmpresa})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}

export function buildSearchFilterByOrder(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${recibo.idPedido} || ' ' || ${cliente.nombre} || ' ' || ${
        cliente.apellido
      })
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}

export function buildSearchFilterByPurchase(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${gasto.idCompra} || ' ' || ${proveedor.nombreEmpresa})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}
