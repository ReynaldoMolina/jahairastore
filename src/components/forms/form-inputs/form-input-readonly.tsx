import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatNumber } from '@/utils/formatters';

type FormInputReadOnlyProps = {
  label: string;
  type?: 'text' | 'number';
  value: number;
};

export default function FormInputReadOnly({
  label,
  type = 'text',
  value,
}: FormInputReadOnlyProps) {
  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        value={type === 'number' ? formatNumber(value) : value}
        disabled
      />
    </FormItem>
  );
}
