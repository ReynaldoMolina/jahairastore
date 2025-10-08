import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type ProductInputProps = {
  defaultValue: string;
  label: string;
  disabled?: boolean;
  updateField: (value: string) => void;
};

export function ProductInput({
  defaultValue,
  label,
  disabled,
  updateField,
}: ProductInputProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder={label}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            updateField(e.target.value);
          }}
          autoComplete="off"
          disabled={disabled}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
