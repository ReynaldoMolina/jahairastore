import Link from 'next/link';
import { bgColors } from '../bgcolors';
import { formatDate } from '@/app/lib/getDate';
import { formatNumber } from '@/app/lib/formatNumber';

export function List({ children }) {
  return (
    <section className="flex flex-col rounded-lg bg-white dark:bg-neutral-900 overflow-hidden">
      {children}
    </section>
  );
}

export function ListTitle({ title }) {
  return <h1 className="font-bold text-xl">{title}</h1>;
}

export function ListCard({ children, href, flexCol = true }) {
  return (
    <Link
      href={href}
      className={`flex ${
        flexCol && 'flex-col md:flex-row'
      } items-start p-4 gap-3 hover:bg-sky-100 dark:hover:bg-neutral-800 border-t first-of-type:border-t-0 border-neutral-300 dark:border-neutral-700`}
    >
      {children}
    </Link>
  );
}

export function ListHeader({ children, hide = true }) {
  return (
    <div
      className={`${
        hide ? 'hidden md:flex' : 'flex'
      } px-4 py-3 md:justify-between items-start gap-3 border-b-2 border-neutral-300 dark:border-neutral-700`}
    >
      {children}
    </div>
  );
}

export function ListBlankSpace() {
  return <div className="mb-13 md:hidden"></div>;
}

export function ListFooter({ children, flexCol = true }) {
  return (
    <div
      className={`flex ${
        flexCol && 'flex-col md:flex-row'
      } px-4 py-3 border-t-3 border-double border-neutral-300 dark:border-neutral-700 md:justify-between items-start gap-3`}
    >
      {children}
    </div>
  );
}

export function ListDetail({
  detail,
  label,
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
        {label}
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
        Fecha
      </span>
      <span className="py-1 px-2 text-xs min-w-25 text-right">{newDate}</span>
    </div>
  );
}

export function ListDescription({ detail }) {
  return (
    <div className="flex w-full justify-between items-center gap-1">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs min-w-18">
        Concepto
      </span>
      <span className="py-1 md:max-w-45 xl:w-auto px-2 text-xs text-right truncate">
        {detail !== '' ? detail : '(Sin concepto)'}
      </span>
    </div>
  );
}

export function ListId({ id, color = 'sky' }) {
  const bgColor = bgColors[color];
  return (
    <span
      className={`flex items-center justify-center p-1 min-w-12 h-6 rounded-xl text-xs ${
        color === 'sky' && 'text-black'
      } ${bgColor}`}
    >
      {id}
    </span>
  );
}

export function ListInfo({ children }) {
  return (
    <div className="flex w-full items-start md:items-center grow gap-2">
      {children}
    </div>
  );
}

export function ListInfoDetail({ children, fullWidth = true }) {
  return (
    <div
      className={`flex ${
        fullWidth ? 'w-full md:w-fit' : 'w-fit'
      } flex-col md:flex-row gap-1 md:gap-2 items-end md:items-center flex-wrap md:flex-nowrap`}
    >
      {children}
    </div>
  );
}

export function ListName({ name }) {
  return <span className="py-1 w-full text-xs">{name}</span>;
}

export function ListPhone({ phone }) {
  return (
    <span className="w-25 min-w-25 text-left text-xs rounded-xl py-1">
      {phone === '' ? '-' : phone}
    </span>
  );
}
