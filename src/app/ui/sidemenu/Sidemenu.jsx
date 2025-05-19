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
      className="flex flex-col md:min-h-screen bg-white dark:bg-neutral-700/50 md:shadow-xl rounded-t-xl md:rounded-tl-none md:rounded-r-xl z-1 w-screen md:min-w-55 md:w-55 order-2 md:order-0"
    >
      <h2 className="hidden md:flex h-13 bg-transparent justify-center items-center font-semibold">Jahaira Store</h2>
      <nav className="flex flex-row md:flex-col justify-start overflow-scroll px-2 py-1 md:p-0 gap-1">
        {menuOptions.map(option => (
          <div
            key={option.id}
            className="flex md:flex-col items-center gap-1 w-full"
          >
            <Link
              href={option.url}
              className={`flex flex-col md:flex-row md:w-8/10 md:h-11 justify-center md:justify-start items-center cursor-pointer rounded-xl mx-auto hover:bg-sky-100 dark:hover:bg-neutral-600 gap-1 md:gap-3 py-2 md:py-0 px-3 text-xs md:text-md text-center ${pathname.includes(option.url) ? "bg-sky-100 dark:bg-neutral-600" : ""}`}
            >
              <SideMenuIcon name={option.name} />
              {option.name}
            </Link>
            {option.divider && (
              <div className="h-7/10 md:w-8/10 border-r-1 md:border-b-1 dark:border-neutral-600 border-neutral-200"></div>
            )}
          </div>
        ))}
      </nav>
    </menu>
  )
}