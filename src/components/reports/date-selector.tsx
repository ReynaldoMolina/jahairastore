import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getCurrentMonth } from '@/lib/get-date';
import { bgColors } from '@/lib/bg-colors';

export function DateSelector({ searchParams }) {
  const { firstDay, lastDay } = getCurrentMonth();
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;
  const [filter, setFilter] = useState({
    start: startParam || firstDay,
    end: endParam || lastDay,
  });

  return (
    <div className="flex justify-evenly md:justify-normal gap-2 w-full md:w-auto">
      <DatePicker
        name="start"
        label="Inicio"
        filter={filter}
        setFilter={setFilter}
      />
      <DatePicker
        name="end"
        label="Fin"
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}

function useSearchUtils() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateURL };
}

function DatePicker({ name, label, filter, setFilter }) {
  const { updateURL } = useSearchUtils();

  function handleChange(e) {
    const newDate = e.target.value;
    setFilter({ ...filter, [name]: newDate });
    updateURL(name, newDate);
  }

  return (
    <div className="flex w-full flex-col md:flex-row md:items-center gap-1">
      <label htmlFor={name} className="text-xs px-1 font-bold">
        {label}:
      </label>
      <input
        type="date"
        name={name}
        id={name}
        value={filter[name]}
        onChange={handleChange}
        className={`text-xs w-full rounded-lg p-2 h-9 ${bgColors.borderColor}`}
      />
    </div>
  );
}
