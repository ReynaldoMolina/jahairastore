'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Search from '@/app/ui/icons/search.svg';
import NewRegister from './NewRegister';

export default function SearchInput({ allowNew = true }) {
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
    <search className="flex relative gap-2 justify-center items-center w-full">
      <Search className="flex size-5 absolute left-3 stroke-2" />
      <input
        type="search"
        className="bg-white dark:bg-neutral-900 rounded-lg outline outline-neutral-300 dark:outline-neutral-600 h-10 pl-11 pr-1 w-full text-sm focus-within:outline-neutral-600 focus-within:dark:outline-neutral-400 hover:outline-neutral-600 dark:hover:outline-neutral-400"
        placeholder="Buscar"
        autoComplete="off"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
      ></input>
      <NewRegister allowNew={allowNew} />
    </search>
  );
}
