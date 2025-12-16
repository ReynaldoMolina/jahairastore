'use client';

import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import { RefObject } from 'react';

interface GoToTopProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export function GoToTop({ scrollRef }: GoToTopProps) {
  return (
    <Button
      variant="secondary"
      size="icon-lg"
      className="fixed z-10 bottom-3 right-3"
      onClick={() =>
        scrollRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <ArrowUp />
    </Button>
  );
}
