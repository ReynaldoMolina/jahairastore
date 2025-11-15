import Link from 'next/link';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { ChevronRightIcon } from 'lucide-react';

export function FormOption({ label, children, href }) {
  return (
    <Item variant="outline" size="sm" asChild>
      <Link href={href} className="w-full">
        <ItemMedia>{children}</ItemMedia>
        <ItemContent>
          <ItemTitle>{label}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Link>
    </Item>
  );
}
