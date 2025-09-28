import Link from 'next/link';
import { bgColors } from '../bgcolors';
import React from 'react';
import { formatNumber } from '@/fetch-data/format-number';
import { formatDate } from '@/utils/formatters';

export function List({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2 md:gap-0 rounded-md overflow-hidden pb-1 md:pb-0 md:border">
      {children}
    </section>
  );
}

export function ListTitle({ title }: { title: string }) {
  return <span className="font-bold">{title}</span>;
}

const listCardSClassName =
  'flex flex-col md:flex-row items-start p-4 gap-3 hover:bg-muted border md:border-0 md:border-t md:first-of-type:border-t-0 bg-card rounded-md md:rounded-none shadow md:shadow-none';

export function ListCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className={listCardSClassName}>
      {children}
    </Link>
  );
}

export function ProductSearchCard({ children }: { children: React.ReactNode }) {
  return <div className={listCardSClassName}>{children}</div>;
}

export function ListHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:flex px-4 py-2 md:justify-between items-center gap-3 border-b bg-secondary">
      {children}
    </div>
  );
}

export function ListBlankSpace() {
  return <div className="mb-13 md:hidden"></div>;
}

export function ListFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row px-4 py-3 md:border-t-3 border-double border-neutral-300 dark:border-neutral-700 md:justify-between items-start gap-3 bg-white dark:bg-neutral-900 rounded-lg md:rounded-none shadow md:shadow-none">
      {children}
    </div>
  );
}

interface ListDetailProps {
  detail: number | string;
  label: string;
  color?: string;
  number?: boolean;
  nio?: boolean;
  ping?: boolean;
}

export function ListDetail({
  detail,
  label,
  color = 'none',
  number = true,
  nio = false,
  ping = false,
}: ListDetailProps) {
  const value = number ? formatNumber(detail) : detail;
  const bgColor = bgColors[color];
  const currency = nio ? 'C$ ' : '$ ';

  return (
    <div className="flex w-full justify-between items-center gap-1 relative">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs min-w-18">
        {label}:
      </span>
      <span
        className={`rounded-xl py-1 px-2 text-xs min-w-25 text-right ${bgColor}`}
      >
        {number && <span>{currency}</span>}
        {value}
      </span>
      {ping && (
        <>
          <span className="flex absolute -right-0.5 -top-0.5 rounded-full bg-red-400 size-2.5"></span>
          <span className="flex absolute -right-0.5 -top-0.5 animate-ping rounded-full bg-red-400 size-2.5"></span>
        </>
      )}
    </div>
  );
}

export function ListDate({ date = '' }) {
  const newDate = date !== '' ? formatDate(date) : 'FECHA';

  return (
    <div className="flex w-full justify-between items-center gap-1">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs min-w-18">
        Fecha:
      </span>
      <span className="py-1 px-2 text-xs min-w-25 text-right">{newDate}</span>
    </div>
  );
}

export function ListDescription({ detail }) {
  return (
    <div className="flex w-full justify-between items-center gap-1">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs min-w-18">
        Concepto:
      </span>
      <span className="py-1 md:max-w-45 xl:w-auto px-2 text-xs text-right truncate">
        {detail !== '' ? detail : '(Sin concepto)'}
      </span>
    </div>
  );
}

interface ListIdProps {
  id: number | string;
  label?: string;
  color?: string;
}

export function ListId({ id, label = '', color = 'mdsky' }: ListIdProps) {
  const bgColor = bgColors[color];
  return (
    <div className="flex order-2 md:order-first items-center gap-1">
      <span className="md:hidden text-xs text-muted-foreground">{label}:</span>
      <span
        className={`md:p-1 rounded-full ${bgColor} ${
          color === 'mdsky' && 'text-muted-foreground md:text-black'
        } md:text-center min-w-15 text-xs`}
      >
        {id}
      </span>
    </div>
  );
}

export function ListInfo({ children, hideBorder = false }) {
  return (
    <div
      className={`flex flex-col md:flex-row w-full items-start grow gap-1 md:gap-4 pb-2 md:pb-0 ${
        !hideBorder && 'border-b md:border-b-0'
      }`}
    >
      {children}
    </div>
  );
}

export function ListInfoDetail({ children }) {
  return (
    <div className="flex w-full md:w-fit flex-col md:flex-row gap-1 md:gap-2 items-end md:items-center flex-wrap md:flex-nowrap">
      {children}
    </div>
  );
}

export function ListName({ name }: { name: string }) {
  return <span className="py-1 text-sm md:text-xs md:font-medium">{name}</span>;
}

export function ListPhone({ phone }: { phone: string }) {
  return (
    <div className="flex w-full justify-between items-center gap-1 relative">
      <span className="md:hidden text-muted-foreground text-xs min-w-18">
        Teléfono:
      </span>
      <span className="w-25 min-w-25 text-right text-xs md:py-1">
        {phone ? phone : '-'}
      </span>
    </div>
  );
}
