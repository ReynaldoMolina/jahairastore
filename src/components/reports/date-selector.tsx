import { Dispatch, SetStateAction, useState } from 'react';
import { getCurrentMonth } from '@/lib/get-date';
import { dateIsoToDate } from '@/lib/formatters';
import { DatePicker } from '../date-picker';
import { SearchParamsProps } from '@/types/types';
import { useSearchUtils } from '@/hooks/use-search-utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { ToggleGroupItem } from '../ui/toggle-group';

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
    <Dialog>
      <DialogTrigger asChild>
        <ToggleGroupItem value="6">
          <Calendar className="size-3.5" />
          Elegir rango
        </ToggleGroupItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elegir rango de fechas</DialogTitle>
          <DialogDescription>
            Selecciona las fechas para generar los informes.
          </DialogDescription>
        </DialogHeader>
        <div className="inline-flex flex-col md:flex-row gap-6">
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
        <DialogFooter>
          <DialogClose asChild>
            <Button>Aceptar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  const { updateParams } = useSearchUtils();

  function handleChange(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];
    setFilter({ ...filter, [name]: formattedDate });
    updateParams({
      [name]: formattedDate,
    });
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
