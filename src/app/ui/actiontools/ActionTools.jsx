'use client'

import {usePathname } from "next/navigation";
import Link from "next/link";
import Add from "@/app/ui/actiontools/add.svg";
import SearchInput from "@/app/ui/ActionTools/SeachInput";
import getDate from "@/app/lib/getDate";

const actionButtonStyle = "flex justify-center items-center w-full max-w-10 h-10 bg-green-300 dark:bg-green-900 rounded-xl cursor-pointer border-none shadow-sm hover:bg-green-400/70 dark:hover:bg-green-700 active:bg-green-300 dark:active:bg-green-600";

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
        className={`${actionButtonStyle} ${allowNew || "hidden"} text-xs min-w-20 gap-1`}>
        <Add className="flex size-5" />
        Nuevo
      </Link>
    </div>
  )
}