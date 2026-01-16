import { FieldDescription, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

interface FormTextAreaProps {
  value: string;
  label: string;
  description?: string;
}

export function FormTextAreaReadOnly({
  value,
  label,
  description,
}: FormTextAreaProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <Textarea
        value={value}
        className="field-sizing-content text-muted-foreground"
        readOnly
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
}
