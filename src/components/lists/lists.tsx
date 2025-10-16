import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { formatDate } from '@/lib/get-date';
import Link from 'next/link';

export function List({ children }) {
  return (
    <section className="flex flex-col gap-2 md:gap-0 rounded-lg overflow-hidden pb-1 md:pb-0">
      {children}
    </section>
  );
}

export function ListTitle({ title }) {
  return <h1 className="font-bold text-md">{title}</h1>;
}

const listCardSClassName =
  'flex flex-col md:flex-row items-start p-4 gap-3 hover:bg-sky-100 dark:hover:bg-neutral-800 md:border-t first-of-type:border-t-0 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg md:rounded-none shadow md:shadow-none';

export function ListCard({ children, href }) {
  return (
    <Link href={href} className={listCardSClassName}>
      {children}
    </Link>
  );
}

export function ProductSearchCard({ children }) {
  return <div className={listCardSClassName}>{children}</div>;
}

export function ListHeader({ children }) {
  return (
    <div className="hidden md:flex px-4 py-3 md:justify-between items-center gap-3 border-b-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      {children}
    </div>
  );
}

export function ListBlankSpace() {
  return <div className="mb-13 md:hidden"></div>;
}

export function ListFooter({ children }) {
  return (
    <div className="flex flex-col md:flex-row px-4 py-3 md:border-t-3 border-double border-neutral-300 dark:border-neutral-700 md:justify-between items-start gap-3 bg-white dark:bg-neutral-900 rounded-lg md:rounded-none shadow md:shadow-none">
      {children}
    </div>
  );
}

export function ListDetail({
  detail,
  label = '',
  color = 'none',
  number = true,
  nio = false,
  ping = false,
}) {
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

export function ListId({ id, label = '', color = 'mdsky' }) {
  const bgColor = bgColors[color];
  return (
    <div className="flex order-2 md:order-first items-center gap-1">
      <span className="md:hidden text-xs">{label}:</span>
      <span
        className={`md:p-1 rounded-full ${bgColor} ${
          color === 'mdsky' && 'md:text-black'
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
        !hideBorder &&
        'border-b md:border-b-0 border-neutral-300 dark:border-neutral-700'
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

export function ListName({ name }) {
  return (
    <span className="py-1 text-sm font-bold md:text-xs md:font-medium">
      {name}
    </span>
  );
}

export function ListPhone({ phone }) {
  return (
    <div className="flex w-full justify-between items-center gap-1 relative">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs min-w-18">
        Teléfono:
      </span>
      <span className="w-25 min-w-25 text-right text-xs md:py-1">
        {phone === '' ? '-' : phone}
      </span>
    </div>
  );
}
