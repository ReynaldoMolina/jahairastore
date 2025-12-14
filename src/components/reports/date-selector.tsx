import { Dispatch, SetStateAction, useState } from 'react';
import { getCurrentMonth } from '@/lib/get-date';
import { dateIsoToDate } from '@/lib/formatters';
import { DatePicker } from '../date-picker';
import { SearchParamsProps } from '@/types/types';
import { useSearchUtils } from '@/hooks/use-search-utils';

interface DateSelector {
  searchParams: SearchParamsProps;
}

export function DateSelector({ searchParams }: DateSelector) {
  const { firstDay, lastDay } = getCurrentMonth();

  const startParam: string = searchParams?.start;
  const endParam: string = searchParams?.end;

  const [filter, setFilter] = useState({
    start: startParam || firstDay,
    end: endParam || lastDay,
  });

  return (
    <>
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
    </>
  );
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
