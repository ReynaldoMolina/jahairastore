import SelectField from '@/components/select-field';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SelectOptions } from '@/types/types';
import { FieldValues, Control, Path } from 'react-hook-form';

type FormSelectType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOptions[];
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormSelectType<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <SelectField field={field} options={options} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
