import { Badge } from '@/components/ui/badge';
import { BgColors, bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';

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
  const formattedValue =
    typeof value === 'number' ? formatNumber(value) : value;
  const bgColor = bgColors[color];
  const currency = showPriceInNio ? 'C$ ' : '$ ';

  return (
    <div className="flex relative">
      <Badge
        variant="secondary"
        className={cn(
          'justify-end md:w-full min-w-27 md:min-w-fit',
          bgColor,
          className
        )}
      >
        {!hideCurrency && <span>{currency}</span>}
        {formattedValue}
      </Badge>
      {showPing && (
        <>
          <span className="flex absolute size-2.5 bg-destructive rounded-full -right-0.5"></span>
          <span className="flex absolute size-2.5 bg-destructive rounded-full -right-0.5 animate-ping"></span>
        </>
      )}
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
