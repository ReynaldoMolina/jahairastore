'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { dateToIso, formatDate } from '@/lib/get-date';
import { es } from 'date-fns/locale';

interface DatePicker {
  label: string;
  initialDate: Date;
  handleChange: (date: Date) => void;
}

export function DatePicker({ label, initialDate, handleChange }: DatePicker) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? formatDate(dateToIso(date)) : 'Seleccionar fecha'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              handleChange(date);
            }}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
