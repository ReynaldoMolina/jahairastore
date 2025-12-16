import { cn } from '@/lib/utils';
import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function TypographySection({
  children,
  id,
  className,
}: TypographyProps) {
  return (
    <section id={id} className={cn('mt-16 scroll-m-10', className)}>
      {children}
    </section>
  );
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className, id }: TypographyProps) {
  return (
    <h3
      id={id ? id : null}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, id }: TypographyProps) {
  return (
    <h4
      id={id ? id : null}
      className="scroll-m-20 text-xl font-semibold tracking-tight"
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6 text-sm', className)}
    >
      {children}
    </p>
  );
}

export function TypographyList({ children }: TypographyProps) {
  return (
    <ul className="leading-7 ml-6 list-disc [&>li]:mt-2 text-sm">{children}</ul>
  );
}

export function TypographyBlockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
}
