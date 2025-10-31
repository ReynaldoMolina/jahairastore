import { FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormInput {
  value: number | string;
  label: string;
  description?: string;
}

export function FormInputClient({ value, label, description }: FormInput) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <Input defaultValue={value} />
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
}
