import Link from "next/link";
import { bgColors } from "../bgcolors";

export function List({ children, blankSpaceBottom = true }) {
  return (
    <section className={`flex h-0 flex-col grow overflow-scroll gap-1 rounded-xl ${blankSpaceBottom && "pb-18"}`}>
      {children}
    </section>
  );
}

export function ListCard({ children, href }) {
  return (
    <Link
      href={href}
      className="flex rounded-xl bg-white dark:bg-neutral-800 p-2 shadow-xs gap-2 hover:bg-sky-100 dark:hover:bg-neutral-700/60 transition"
    >
      {children}
    </Link>
  );
}

export function ListFooter({ children }) {
  return (
    <div
      className="flex p-2 md:justify-between items-start gap-2 border-t-2 border-neutral-300 dark:border-neutral-700 mt-1"
    >
      {children}
    </div>
  );
}

export function ListHeader({ children }) {
  return (
    <div
      className="flex rounded-xl bg-white dark:bg-neutral-800 p-2 md:justify-between items-start gap-2 sticky top-0 z-10 shadow-lg"
    >
      {children}
    </div>
  );
}

export function ListDate({ date }) {
  return (
    <span className="p-1 text-xs text-left md:text-center min-w-fit text-neutral-500 dark:text-neutral-400">{date}</span>
  );
}

export function ListDetail({ detail, color = 'gray', type = "number", ping = false }) {
  const value = type === "number" ? detail.toFixed(2) : detail;
  const textAlign = type === "number" ? "text-right" : "text-center";
  const bgColor = bgColors[color];

  return (
    <div className="flex relative ">
      <span className={`rounded-xl py-1 px-2 text-xs w-18 ${bgColor} ${textAlign}`}>{value}</span>
      {ping &&
        <>
          <span className="flex absolute -right-0.5 -top-0.5 rounded-full bg-red-400 size-2.5"></span>
          <span className="flex absolute -right-0.5 -top-0.5 animate-ping rounded-full bg-red-400 size-2.5"></span>
        </>
      }
    </div>
  );
}

export function ListDescription({ detail }) {
  return (
    <span className="py-1 opacity-60 text-xs md:border-b-1 border-neutral-300 dark:border-neutral-500 text-left w-full max-w-58 truncate">{detail !== '' ? detail : '(Sin concepto)'}</span>
  );
}

export function ListId({ id, color = 'sky' }) {
  const bgColor = bgColors[color];
  return (
    <span className={`flex items-center justify-center p-1 min-w-12 h-6 rounded-xl text-xs ${color !== 'gray' && "text-black"} ${bgColor}`}>{id}</span>
  );
}

export function ListInfo({ children, display = "flex-col md:flex-row items-start md:items-center" }) {
  return (
    <div className={`flex ${display} grow gap-1 md:gap-2`}>
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
    <span className="py-1 w-full text-xs">{name}</span>
  );
}

export function ListPhone({ phone }) {
  return (
    <span className="w-27 text-center text-xs bg-neutral-200/60 dark:bg-neutral-700 rounded-xl p-1">{phone === '' ? '-' : phone}</span>
  );
}

export function NameDateDiv({ children }) {
  return (
    <div className="flex items-center w-full">
      {children}
    </div>
  );
}