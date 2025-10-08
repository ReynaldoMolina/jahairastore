'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './ui/form';
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { SelectOptions } from '@/types/types';

interface ComboBoxProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  options: SelectOptions;
  form: UseFormReturn<T>;
}

export function ComboBox<T extends FieldValues>({
  field,
  options,
  form,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    // add modal={true} to allow scroll inside modal
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between text-sm font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value
              ? options.find((option) => option.value === String(field.value))
                  ?.label
              : 'Selecciona una opción'}
            <ChevronsUpDown className="opacity-50 ml-auto" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="max-h-50">
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {options.map((element) => (
                <CommandItem
                  key={element.value}
                  value={element.label}
                  onSelect={() => {
                    form.setValue(field.name, Number(element.value));
                    setOpen(false);
                  }}
                >
                  {element.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      element.value === String(field.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
