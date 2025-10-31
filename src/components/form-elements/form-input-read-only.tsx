import { FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormInput {
  value: number | string;
  label: string;
  description?: string;
}

export function FormInputReadOnly({ value, label, description }: FormInput) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <Input value={value} disabled />
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
}
