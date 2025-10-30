import { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { dateIsoToDate, getCurrentMonth } from '@/lib/get-date';
import { DatePicker } from '../date-picker';

export function DateSelector({ searchParams }) {
  const { firstDay, lastDay } = getCurrentMonth();

  const startParam: string = searchParams?.start;
  const endParam: string = searchParams?.end;

  const [filter, setFilter] = useState({
    start: startParam || firstDay,
    end: endParam || lastDay,
  });

  return (
    <div className="flex flex-col sm:flex-row gap-5 w-full">
      <DatePickerForm
        name="start"
        label="Desde el:"
        filter={filter}
        setFilter={setFilter}
      />
      <DatePickerForm
        name="end"
        label="Hasta el:"
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

interface DatePickerForm {
  name: 'start' | 'end';
  label: string;
  filter: {
    start: string;
    end: string;
  };
  setFilter: Dispatch<
    SetStateAction<{
      start: string;
      end: string;
    }>
  >;
}

function DatePickerForm({ name, label, filter, setFilter }: DatePickerForm) {
  const { updateURL } = useSearchUtils();

  function handleChange(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];
    setFilter({ ...filter, [name]: formattedDate });
    updateURL(name, formattedDate);
  }

  const dateString = filter[name];
  const initialDate = dateIsoToDate(dateString);

  return (
    <DatePicker
      label={label}
      initialDate={initialDate}
      handleChange={handleChange}
    />
  );
}
