'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './ui/form';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

interface DatePickerProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
}

export function DatePicker<T extends FieldValues>({
  field,
  disabled = false,
}: DatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedDate =
    typeof field.value === 'string' && field.value
      ? parse(field.value, 'yyyy-MM-dd', new Date())
      : undefined;

  function handleSelect(date: Date | undefined) {
    field.onChange(date ? format(date, 'yyyy-MM-dd') : null);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            <span className="text-sm">
              {selectedDate
                ? format(selectedDate, 'dd/MMM/yyyy', { locale: es })
                : 'Selecciona una fecha'}
            </span>
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            handleSelect(date);
            setOpen(false);
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
