import { FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormInputOnChange {
  value: number | string;
  label: string;
  handleChange: (value: string) => void;
}

export function FormInputOnChange({
  value,
  label,
  handleChange,
}: FormInputOnChange) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <Input
        placeholder={label}
        value={isNaN(Number(value)) ? '' : value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
