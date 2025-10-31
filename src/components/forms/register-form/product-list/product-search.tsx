import { useState } from 'react';
import { ListFilter } from '@/components/actiontools/list-filter';
import { ChevronDown } from 'lucide-react';
import { ActionBar } from '@/components/actiontools/action-bar';

export function ProductSearch({ children, open }) {
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(open);

  return (
    <section
      className={`flex flex-col gap-4 bg-neutral-100 dark:bg-black border rounded-lg p-2 my-6`}
    >
      <div
        className="flex items-center justify-between gap-1 cursor-pointer"
        onClick={() => setIsSearchProductOpen((state) => !state)}
      >
        <p className="text-xs font-semibold">Agregar productos</p>
        <ChevronDown
          className={`rounded-md w-9 h-5 bg-white dark:bg-neutral-700 ${
            isSearchProductOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {isSearchProductOpen && (
        <div className="flex flex-col max-h-[70dvh] overflow-y-auto gap-3">
          <ActionBar>
            <></>
          </ActionBar>
          {children}
        </div>
      )}
    </section>
  );
}
