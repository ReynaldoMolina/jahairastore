import { Controller } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

interface FormInput {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function FormTextArea({
  form,
  name,
  label,
  placeholder,
  description,
  className,
}: FormInput) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder ? placeholder : label}
            autoComplete="off"
            className={className}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
