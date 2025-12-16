import {
  clientes,
  egresos,
  proveedores,
  recibos,
} from '@/database/schema/schema';
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
        unaccent(${clientes.nombre} || ' ' || ${clientes.apellido})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}

export function buildSearchFilterByProvider(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${proveedores.nombreEmpresa})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}

export function buildSearchFilterByOrder(searchParams: SearchParamsProps) {
  const search: string = searchParams?.query?.trim() || '';

  if (!search) return undefined;

  return search
    ? sql`
        unaccent(${recibos.idPedido} || ' ' || ${clientes.nombre} || ' ' || ${
        clientes.apellido
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
        unaccent(${egresos.idCompra} || ' ' || ${proveedores.nombreEmpresa})
        ILIKE unaccent(${`%${search}%`})
      `
    : undefined;
}
