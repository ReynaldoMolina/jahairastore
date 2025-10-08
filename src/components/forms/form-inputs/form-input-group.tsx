import { cn } from '@/lib/utils';
import React from 'react';

interface FormInputGroupProps {
  children: React.ReactNode;
  className?: string;
  rowInMobile?: boolean;
  hidden?: boolean;
}

export function FormInputGroup({
  children,
  className,
  rowInMobile,
  hidden = false,
}: FormInputGroupProps) {
  return (
    <div
      className={cn(
        `${hidden ? 'hidden' : 'flex'} ${
          rowInMobile ? 'flex-row' : 'flex-col md:flex-row'
        }  gap-5 w-full justify-start`,
        className
      )}
    >
      {children}
    </div>
  );
}
