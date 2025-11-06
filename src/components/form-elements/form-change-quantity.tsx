import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';

interface ChangeQuantity {
  handleChangeQty: (value: number | string) => void;
  existencias: number;
  className?: string;
}

export function ChangeQuantityCard({
  handleChangeQty,
  existencias,
  className,
}: ChangeQuantity) {
  return (
    <div className="flex justify-between w-full items-center gap-3">
      <span className="text-muted-foreground text-xs">Cantidad</span>
      <ChangeQuantity
        handleChangeQty={handleChangeQty}
        existencias={existencias}
        className={className}
      />
    </div>
  );
}

export function ChangeQuantity({
  handleChangeQty,
  existencias,
  className,
}: ChangeQuantity) {
  return (
    <Select
      defaultValue={'1'}
      onValueChange={(value) => handleChangeQty(value)}
    >
      <SelectTrigger
        className={cn(
          'w-full max-w-25 md:max-w-fit max-h-6 rounded-full bg-card',
          className
        )}
      >
        <SelectValue placeholder="Seleccionar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: existencias }, (_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
