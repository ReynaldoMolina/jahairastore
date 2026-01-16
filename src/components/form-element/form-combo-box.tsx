import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { FormControl } from '../ui/form';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { SelectOptions } from '@/types/types';

interface FormComboBox<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  selectOptions: SelectOptions[];
  label: string;
  description?: string;
  disabled?: boolean;
}

export function FormComboBox<T extends FieldValues>({
  control,
  name,
  selectOptions,
  label,
  description,
  disabled,
}: FormComboBox<T>) {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  className={cn(
                    'w-full justify-between font-normal truncate overflow-ellipsis',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? selectOptions.find(
                        (option) => option.value === String(field.value)
                      )?.label
                    : 'Selecciona una opción'}
                  <ChevronsUpDown className="opacity-50 ml-auto" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command className="max-h-50">
                <CommandInput placeholder="Buscar" className="h-9" />
                <CommandList>
                  <CommandEmpty>No hay resultados</CommandEmpty>
                  <CommandGroup>
                    {selectOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          field.onChange(option.value);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            option.value === String(field.value)
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
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
