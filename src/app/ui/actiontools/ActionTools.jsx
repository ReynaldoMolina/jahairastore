'use client'

import {usePathname } from "next/navigation";
import Link from "next/link";
import Add from "@/app/ui/icons/add.svg";
import SearchInput from "@/app/ui/actiontools/SearchInput";

export default function ActionTools({ allowNew = true }) {
  const pathname = usePathname();
  let href = `${pathname}/create`;

  if (pathname === '/ventas') {
    href = `${pathname}/create?page=1&query=disponibles`
  }
  
  return (
    <div className="flex justify-center items-center gap-1">
      <SearchInput />
    </div>
  )
}