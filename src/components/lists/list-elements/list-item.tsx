import { Badge } from '@/components/ui/badge';
import { BgColors, bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface CardItem {
  value: number | string;
  label: string;
  color?: BgColors;
  hideCurrency?: boolean;
  showPriceInNio?: boolean;
  showPing?: boolean;
  className?: string;
}

export function CardItem({
  value,
  label,
  color = 'none',
  hideCurrency = false,
  showPriceInNio = false,
  showPing = false,
  className,
}: CardItem) {
  return (
    <div className="inline-flex w-full justify-between gap-2">
      <span className="text-muted-foreground text-xs">{label}</span>
      <ListItem
        value={value}
        color={color}
        hideCurrency={hideCurrency}
        showPriceInNio={showPriceInNio}
        showPing={showPing}
        className={className}
      />
    </div>
  );
}

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
  const isNumber = typeof value === 'number';
  const formattedValue = isNumber ? formatNumber(value) : value;
  const bgColor = bgColors[color];
  const currency = hideCurrency ? null : showPriceInNio ? 'C$ ' : '$ ';

  return (
    <div className="flex relative">
      <Badge
        variant="secondary"
        className={cn(
          'justify-end md:w-full min-w-25 md:min-w-fit',
          bgColor,
          className
        )}
      >
        {!hideCurrency && <span>{currency}</span>}
        {formattedValue}
      </Badge>
      {showPing && (
        <>
          <span className="flex absolute size-2 bg-destructive rounded-full -right-0.5"></span>
          <span className="flex absolute size-2 bg-destructive rounded-full -right-0.5 animate-ping"></span>
        </>
      )}
    </div>
  );
}
