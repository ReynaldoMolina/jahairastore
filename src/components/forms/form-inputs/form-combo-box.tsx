import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ComboBox } from '@/components/combo-box';
import { SelectOptions } from '@/types/types';

type FormComboboxProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: SelectOptions;
};

export function FormCombobox<T extends FieldValues>({
  form,
  name,
  label,
  options,
}: FormComboboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <ComboBox field={field} options={options} form={form} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
