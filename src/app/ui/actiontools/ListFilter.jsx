'use client';

import { useState } from 'react';
import { bgColors } from '../bgcolors';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 20;

export function ListFilter({ showState = false, stateLabel, searchParams }) {
  const limitParam = searchParams?.limit;
  const stateParam = searchParams?.state;
  const [filter, setFilter] = useState({
    limit: Number(limitParam) || ITEMS_PER_PAGE,
    state: Boolean(stateParam) || false,
  });

  return (
    <div className="flex justify-end gap-4">
      {showState && (
        <FilterState
          filter={filter}
          setFilter={setFilter}
          stateLabel={stateLabel}
        />
      )}
      <FilterLimit filter={filter} setFilter={setFilter} />
    </div>
  );
}

function useSearchUtils() {
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

function FilterLimit({ filter, setFilter }) {
  const { updateURL } = useSearchUtils();
  const options = [20, 50, 100, 1];

  function handleChange(e) {
    const newLimit = Number(e.target.value);
    setFilter((prev) => ({ ...prev, limit: newLimit }));
    updateURL('limit', newLimit === ITEMS_PER_PAGE ? null : newLimit);
  }

  return (
    <FilterDiv>
      <label htmlFor="filter-limit">Mostrar:</label>
      <select
        name="filter-limit"
        id="filter-limit"
        className={`text-xs rounded-lg bg-white text-center dark:bg-neutral-800 ${bgColors.borderColor} p-1`}
        value={filter.limit}
        onChange={handleChange}
      >
        {options.map((value) => (
          <option key={value} value={value} className="text-sm">
            {value === 1 ? 'Todo' : value}
          </option>
        ))}
      </select>
    </FilterDiv>
  );
}

function FilterState({ filter, setFilter, stateLabel = 'Con saldo' }) {
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !filter.state;
    setFilter((prev) => ({ ...prev, state: newState }));
    updateURL('state', newState || null);
  }

  return (
    <FilterDiv>
      <label htmlFor="filter-state">{stateLabel}:</label>
      <input
        type="checkbox"
        name="filter-state"
        id="filter-state"
        checked={filter.state}
        onChange={handleChange}
      />
    </FilterDiv>
  );
}

function FilterDiv({ children }) {
  return <div className="flex items-center gap-1 text-xs">{children}</div>;
}
