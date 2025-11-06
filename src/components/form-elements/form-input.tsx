import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormInput<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  onChangeExtra?: (value: string | number) => void;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
  hidden,
  onChangeExtra,
}: FormInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={hidden ? 'hidden' : ''}
        >
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value);
              onChangeExtra?.(value);
            }}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder ? placeholder : label}
            autoComplete="off"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
