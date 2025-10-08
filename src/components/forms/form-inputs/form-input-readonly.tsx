import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatNumber } from '@/utils/formatters';

type FormInputReadOnlyProps = {
  label: string;
  type?: 'text' | 'number';
  value: number;
};

export function FormInputReadOnly({
  label,
  type = 'text',
  value,
}: FormInputReadOnlyProps) {
  console.log(formatNumber(value));

  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        value={type === 'number' ? formatNumber(value) : value}
        disabled
      />
    </FormItem>
  );
}
