import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Field, FieldError } from '../ui/field';

interface FormCheckbox<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  onCheckedExtra?: (checked: boolean) => void;
}

export function FormCheck<T extends FieldValues>({
  control,
  name,
  label,
  description,
  onCheckedExtra,
}: FormCheckbox<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Label className="flex gap-3 items-center">
            <Checkbox
              id={field.name}
              checked={!!field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onCheckedExtra?.(!!checked);
              }}
              ref={field.ref}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal text-sm">
              <p className="leading-none">{label}</p>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          </Label>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
