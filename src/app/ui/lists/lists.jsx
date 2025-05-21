import Link from "next/link";

export function List({ children }) {
  return (
    <section className="flex h-0 flex-col grow overflow-y-scroll gap-1 rounded-xl">
      {children}
    </section>
  );
}

export function ListCard({ children, href }) {
  return (
    <Link
      href={href}
      className="flex rounded-xl bg-white dark:bg-neutral-800 p-2 items-center shadow-xs gap-2 hover:bg-sky-100 dark:hover:bg-neutral-700/60"
    >
      {children}
    </Link>
  );
}

export function ListDate({ date }) {
  return (
    <span className="rounded-xl py-1 px-2 text-center text-xs w-24 border-1 border-neutral-300 dark:border-neutral-500">{date}</span>
  );
}

export function ListDetail({ detail, color ='', type = "text" }) {
  const newDetail = type === "number" ? detail.toFixed(2) : detail;
  return (
    <span className={`rounded-xl py-1 px-2 text-xs w-16 md:w-17 ${color}`}>{newDetail}</span>
  );
}

export function ListId({ id }) {
  return (
    <span className="flex items-center justify-center bg-sky-200 p-1 min-w-12 h-6 rounded-xl text-xs text-black">{id}</span>
  );
}

export function ListInfo({ children }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center grow gap-1 md:gap-2">
      {children}
    </div>
  );
}

export function ListInfoDetail({ children }) {
  return (
    <div className="flex gap-1 sm:gap-2 items-center flex-wrap md:flex-nowrap">
      {children}
    </div>
  );
}

export function ListName({ name }) {
  return (
    <span className="flex w-full text-xs">{name}</span>
  );
}

export function ListPhone({ phone }) {
  return (
    <span className="w-30 text-center text-xs bg-neutral-200/60 dark:bg-neutral-700 rounded-xl p-1">{phone === '' ? '-' : phone}</span>
  );
}