'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Search from "@/app/ui/icons/search.svg";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => { 
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <search className="flex justify-center items-center w-full relative">
      <Search className="flex size-5 absolute left-3 stroke-2" />
      <input
        type="search"
        className="bg-white dark:bg-neutral-800 rounded-xl border-none h-9 pl-11 pr-1 w-full shadow-sm text-sm focus-within:outline-1 focus-within:outline-neutral-400 hover:outline-1 hover:outline-neutral-400"
        placeholder="Buscar"
        autoComplete="off"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
      ></input>
    </search>
  )
}