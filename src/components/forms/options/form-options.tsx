import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import {
  BadgeCheckIcon,
  ChevronRightIcon,
  Coins,
  Receipt,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

export function ClientOptions({ client }) {
  const nombreCliente = `${client.Nombre} ${client.Apellido}`;
  return (
    <FormOptionContainer>
      <FormOption label="Ver pedidos" href={`/pedidos?query=${nombreCliente}`}>
        <ShoppingBag className="size-5" />
      </FormOption>
      <FormOption label="Ver recibos" href={`/recibos?query=${nombreCliente}`}>
        <Receipt className="size-5" />
      </FormOption>
      <FormOption label="Ver ventas" href={`/ventas?query=${nombreCliente}`}>
        <Coins className="size-5" />
      </FormOption>
    </FormOptionContainer>
  );
}

export function FormOptionContainer({ children }) {
  return <div className="flex flex-col w-full gap-3">{children}</div>;
}

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
