'use client';

import { menuOptions } from "@/app/lib/menuOptions";
import { MenuItem } from "./MenuItem";

export default function SideMenu() {
  return (
    <menu
      className="flex flex-col md:min-h-screen bg-white dark:bg-neutral-700/50 md:shadow-xl rounded-t-xl md:rounded-tl-none md:rounded-r-xl z-1 w-screen md:min-w-55 md:w-55 order-2 md:order-0"
    >
      <h2 className="hidden md:flex min-h-13 bg-transparent justify-center items-center font-semibold">Jahaira Store</h2>
      <nav className="flex flex-row md:flex-col justify-start overflow-scroll px-2 py-1 md:mb-2 md:p-0 gap-1">
        {menuOptions.map(option => (
          <div
            key={option.id}
            className="flex md:flex-col items-center gap-1 w-full">
            <MenuItem option={option} />
            {option.divider && (
              <div className="h-7/10 md:w-8/10 border-r-1 md:border-b-1 dark:border-neutral-600 border-neutral-200"></div>
            )}
          </div>
        ))}
      </nav>
    </menu>
  )
}