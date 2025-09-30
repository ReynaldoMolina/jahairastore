import { cn } from '@/lib/utils';
import React from 'react';

interface FormInputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export default function FormInputGroup({
  children,
  className,
}: FormInputGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-5 w-full justify-start',
        className
      )}
    >
      {children}
    </div>
  );
}
