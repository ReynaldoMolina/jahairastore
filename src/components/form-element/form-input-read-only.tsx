import { FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../ui/input-group';

interface FormInput {
  value: number | string;
  label: string;
  description?: string;
  textAddon?: string;
  className?: string;
}

export function FormInputReadOnly({
  value,
  label,
  description,
  textAddon,
  className,
}: FormInput) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FieldLabel>{label}</FieldLabel>
      <InputGroup className={className}>
        {textAddon && (
          <InputGroupAddon>
            <InputGroupText>{textAddon}</InputGroupText>
          </InputGroupAddon>
        )}
        <InputGroupInput value={value} disabled />
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
}
