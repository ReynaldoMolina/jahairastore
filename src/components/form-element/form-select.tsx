import { SelectOptions } from '@/types/types';
import { FieldValues, Control, Path, Controller } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type FormSelectType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOptions[];
  description?: string;
  disabled?: boolean;
  onChangeExtra?: (value: string | number) => void;
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  description,
  disabled = false,
  onChangeExtra,
}: FormSelectType<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onChangeExtra?.(value);
            }}
            defaultValue={String(field.value)}
          >
            <SelectTrigger disabled={disabled}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  );
}
