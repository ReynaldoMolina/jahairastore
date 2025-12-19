import React, { useState, useEffect } from 'react';
import { FieldDescription, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../ui/input-group';
import { cn } from '@/lib/utils';

interface FormInputOnChangeProps {
  value: number | string;
  label: string;
  textAddon?: string;
  handleChange: (value: string) => void;
  description?: string;
  className?: string;
  readOnly?: boolean;
  hidden?: boolean;
}

export function FormInputOnChange({
  value,
  label,
  textAddon,
  handleChange,
  description,
  className,
  readOnly,
  hidden,
}: FormInputOnChangeProps) {
  const [displayValue, setDisplayValue] = useState(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  };

  const handleInputBlur = () => {
    handleChange(displayValue);
  };

  return (
    <div className={hidden ? 'hidden' : 'flex flex-col w-full gap-3'}>
      <FieldLabel>{label}</FieldLabel>
      <InputGroup className={className}>
        {textAddon && (
          <InputGroupAddon>
            <InputGroupText>{textAddon}</InputGroupText>
          </InputGroupAddon>
        )}
        <InputGroupInput
          value={displayValue}
          placeholder={label}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={readOnly ? 'opacity-50' : ''}
          readOnly={readOnly}
        />
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
}
