import { useState } from 'react';
import ArrowDown from '@/app/ui/icons/arrowdown.svg';
import SearchInput from '@/components/actiontools/SearchInput';
import { bgColors } from '@/components/bgcolors';
import { ListFilter } from '@/components/actiontools/ListFilter';

export function ProductSearch({ children, open }) {
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(open);

  return (
    <section
      className={`flex flex-col gap-4 bg-neutral-100 dark:bg-black ${bgColors.borderColor} rounded-lg p-2 my-4`}
    >
      <div
        className="flex items-center justify-between gap-1 cursor-pointer"
        onClick={() => setIsSearchProductOpen((state) => !state)}
      >
        <p className="text-sm font-semibold">Agregar productos</p>
        <ArrowDown
          className={`rounded-md w-10 h-6 bg-white dark:bg-neutral-700 ${
            isSearchProductOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {isSearchProductOpen && (
        <>
          <SearchInput allowNew={false} />
          <ListFilter />
          {children}
        </>
      )}
    </section>
  );
}
