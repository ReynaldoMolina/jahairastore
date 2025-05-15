'use client';

import React from "react";
import Link from "next/link";
import SideMenuIcon from "./SideMenuIcon/sidemenuicon";
import { usePathname } from "next/navigation";
import { menuOptions } from "@/app/lib/menuOptions";

export default function SideMenu() {
  const pathname = usePathname();
  return (
    <menu
      className="flex flex-col sm:min-h-screen bg-white dark:bg-neutral-700/50 sm:shadow-xl rounded-t-xl sm:rounded-tl-none sm:rounded-r-xl z-1 w-screen sm:min-w-55 sm:w-55 order-2 sm:order-0"
    >
      <h2 className="hidden sm:flex h-13 bg-transparent justify-center items-center font-semibold">Jahaira Store</h2>
      <nav className="flex flex-row sm:flex-col justify-start overflow-scroll px-2 py-1 sm:p-0 gap-1">
        {menuOptions.map(option => (
          <div
            key={option.id}
            className="flex sm:flex-col items-center gap-1 w-full"
          >
            <Link
              href={option.url}
              className={`flex flex-col sm:flex-row sm:w-8/10 sm:h-11 justify-center sm:justify-start items-center cursor-pointer rounded-xl mx-auto hover:bg-sky-100 dark:hover:bg-neutral-600 gap-1 sm:gap-3 py-2 sm:py-0 px-3 text-xs sm:text-sm text-center ${pathname.includes(option.url) ? "bg-sky-100 dark:bg-neutral-600" : ""}`}
            >
              <SideMenuIcon name={option.name} />
              {option.name}
            </Link>
            {option.divider && (
              <div className="h-7/10 sm:w-8/10 border-r-1 sm:border-b-1 dark:border-neutral-600 border-neutral-200"></div>
            )}
          </div>
        ))}
      </nav>
    </menu>
  )
}