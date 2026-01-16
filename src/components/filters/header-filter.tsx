'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Toggle } from '../ui/toggle';
import { Clock, PackageCheck } from 'lucide-react';
import { PingDiv } from '../list/ping-div';
import { ITEMS_PER_PAGE } from '@/lib/items-per-page';

type ListName = 'pedidos' | 'ventas' | 'inventario' | 'tareas';

interface HeaderFilter {
  listName: ListName;
}

export function HeaderFilter({ listName }: HeaderFilter) {
  return <FilterState listName={listName} />;
}

export function useSearchUtils() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === false || value === ITEMS_PER_PAGE || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
      params.set('page', '1');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateURL };
}

interface FilterState {
  listName: ListName;
}

function FilterState({ listName }: FilterState) {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state') || '';

  const [listState, setListState] = useState(Boolean(stateParam) || false);
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !listState;
    setListState(newState);
    updateURL('state', newState || null);
  }

  const filters = {
    pedidos: {
      label: 'Saldo',
      icon: <PingDiv />,
    },
    ventas: {
      label: 'Saldo',
      icon: <PingDiv />,
    },
    inventario: {
      label: 'Disponibles',
      icon: <PackageCheck />,
    },
    tareas: {
      label: 'Pendientes',
      icon: <Clock />,
    },
  };

  return (
    <Toggle
      aria-label="Toggle state"
      variant="outline"
      onPressedChange={handleChange}
      pressed={listState}
      className="h-9 shrink-0 px-3 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 
      
      data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 dark:data-[state=on]:border-blue-900 dark:data-[state=on]:bg-blue-950
      "
    >
      {filters[listName].icon}
      <span className="hidden md:block">{filters[listName].label}</span>
    </Toggle>
  );
}
