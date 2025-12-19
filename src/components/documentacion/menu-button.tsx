import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

interface MenuButtonProps {
  title: string;
  href: string;
}

export function MenuButton({ title, href }: MenuButtonProps) {
  return (
    <Button variant="link" size="sm" className="w-full justify-start" asChild>
      <Link href={href} className="block w-full truncate">
        {title}
        <ChevronRight className="ml-auto" />
      </Link>
    </Button>
  );
}
