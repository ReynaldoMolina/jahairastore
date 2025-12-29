import { cn } from '@/lib/utils';

interface PingDivProps {
  className?: string;
}

export function PingDiv({ className }: PingDivProps) {
  return (
    <div className={cn(className, 'size-2.5 bg-destructive rounded-full')}>
      <div className="size-2.5 bg-destructive rounded-full animate-ping"></div>
    </div>
  );
}
