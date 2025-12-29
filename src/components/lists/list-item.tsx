import { Badge } from '@/components/ui/badge';
import { BgColors, bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { PingDiv } from './ping-div';

interface ListItem {
  value: number | string;
  color?: BgColors;
  hideCurrency?: boolean;
  showPriceInNio?: boolean;
  showPing?: boolean;
  className?: string;
}

export function ListItem({
  value,
  color = 'none',
  hideCurrency = false,
  showPriceInNio = false,
  showPing = false,
  className,
}: ListItem) {
  const isString = typeof value === 'string';
  const formattedValue = isString ? value : formatNumber(value);
  const bgColor = bgColors[color];
  const currency = showPriceInNio ? 'C$ ' : '$ ';

  return (
    <div className="flex relative">
      <Badge
        variant="secondary"
        className={cn(
          'w-full min-w-25 md:min-w-min',
          isString ? 'justify-center' : 'justify-end',
          bgColor,
          className
        )}
      >
        {!hideCurrency && <span className="mr-auto">{currency}</span>}
        <span>{formattedValue}</span>
      </Badge>
      {showPing && <PingDiv className="flex absolute -right-0.5" />}
    </div>
  );
}

interface CardItem extends ListItem {
  label: string;
}

export function CardItem({ label, ...props }: CardItem) {
  return (
    <div className="inline-flex w-full justify-between gap-2">
      <span className="text-muted-foreground text-xs">{label}</span>
      <ListItem {...props} />
    </div>
  );
}
