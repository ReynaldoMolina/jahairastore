'use client'

import {usePathname } from "next/navigation";
import Link from "next/link";
import Add from "@/app/ui/actiontools/add.svg";
import SearchInput from "@/app/ui/ActionTools/SeachInput";
import getDate from "@/app/lib/getDate";

const actionButtonStyle = "flex justify-center items-center w-full max-w-10 h-10 bg-sky-200 dark:bg-neutral-700 rounded-xl cursor-pointer border-none shadow-sm hover:bg-sky-300/70 dark:hover:bg-neutral-600 active:bg-sky-300 dark:active:bg-neutral-500";

export default function ActionTools({ allowNew = true }) {
  const pathname = usePathname();
  const currentDate = getDate();
  let href = `${pathname}/create`;

  if (pathname === '/orders') {
    href = `${pathname}/create?page=1&query=${currentDate}`
  }
  
  return (
    <div className="flex justify-center items-center gap-1">
      <SearchInput />
      <Link
        href={href}
        className={`${actionButtonStyle} ${allowNew || "hidden"} flex text-xs min-w-20 gap-1 items-center justify-center`}>
        <Add className="flex size-5" />
        Nuevo
      </Link>
    </div>
  )
}