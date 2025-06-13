'use client';

import { useState } from "react";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import LogoMinimal from "@/app/ui/icons/logominimal.svg";
import Search from "@/app/ui/icons/search.svg";
import Close from "@/app/ui/icons/close.svg";
import { usePathname } from "next/navigation";

export default function Header({ allowSearch = false }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="flex gap-2 justify-between items-center border-b-1 border-b-neutral-200 dark:border-b-neutral-700 p-1 pt-0 bg-transparent relative">
      {isSearchOpen ||
        <h1 className="font-semibold">Jahaira Store</h1>
      }
      {isSearchOpen && 
        <SearchInput />
      }
      <div className="flex gap-2">
        {(isSearchOpen || allowSearch) ?
          <Close
            className="size-9 p-2 rounded-full bg-white dark:bg-neutral-800 cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
          />
          :
          <Search
            className="size-9 p-2 rounded-full hover:bg-white hover:dark:bg-neutral-800 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          />
        }
        <LogoMinimal
          className="size-9 p-2 rounded-full hover:bg-white hover:dark:bg-neutral-800 cursor-pointer"
          onClick={() => alert('Hola')} />
      </div>
    </header>
  )
}