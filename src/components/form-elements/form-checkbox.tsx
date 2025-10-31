import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';

interface FormCheckbox<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
}

export function FormCheck<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormCheckbox<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 w-full">
            <Checkbox
              id={field.name}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              ref={field.ref}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-xs leading-none font-medium">{label}</p>
              {description && (
                <p className="text-muted-foreground text-xs">{description}</p>
              )}
            </div>
          </Label>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
