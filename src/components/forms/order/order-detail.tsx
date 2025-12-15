'use client';

import { calculateTotals } from '@/lib/calculate-totals';
import { OrderById } from '@/types/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { CardItem, ListItem } from '@/components/lists/list-item';
import { Badge } from '@/components/ui/badge';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { TableContainer } from '@/components/lists/table';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteDetailButton } from '@/components/form-elements/delete-detail-button';
import { EditDetailButton } from '@/components/form-elements/edit-detail-button';
import Image from 'next/image';

interface OrderDetail {
  order: OrderById;
  handleDelete: (productId: number) => void;
}

export function OrderDetail({ order, handleDelete }: OrderDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: order.detail });

  if (order.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {order.detail.map((detail) => {
          const { precioVenta, precioCompra, cantidad } = detail;

          const subtotalVenta = precioVenta * cantidad;
          const subtotalCompra = precioCompra * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <Card key={detail.id} className="py-4 gap-4">
              <CardHeader className="border-b [.border-b]:pb-4">
                {detail.imagenUrl && (
                  <Image
                    src={detail.imagenUrl}
                    width={100}
                    height={100}
                    alt="Thumbnail"
                    className="rounded text-xs bg-muted"
                  />
                )}
                <CardTitle>{detail.nombreProducto}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge variant="secondary" className={`${bgColors.green}`}>
                    $ {formatNumber(detail.precioVenta)}
                  </Badge>
                  <Badge variant="secondary">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <EditDetailButton
                    href={`/pedidos/${order.id}/detalle/${detail.id}`}
                  />
                  <DeleteDetailButton
                    handleDelete={() => handleDelete(detail.id)}
                  />
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-1">
                <CardItem
                  value={subtotalVenta}
                  label="Subtotal"
                  color="green"
                />
                <CardItem value={ganancia} label="Ganancia" color="blue" />
              </CardContent>
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3">
              <Badge variant="outline">Items: {order.detail.length}</Badge>
              <Badge variant="outline">Cant: {formTotals.quantity}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <CardItem
              value={formTotals.totalSell}
              label="Total"
              color="green"
            />
            <CardItem value={formTotals.profit} label="Ganancia" color="blue" />
          </CardContent>
        </Card>
      </>
    );

  return (
    <TableContainer>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {order.detail.map((detail) => {
          const { precioVenta, precioCompra, cantidad } = detail;

          const subtotalVenta = precioVenta * cantidad;
          const subtotalCompra = precioCompra * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <TableRow
              key={detail.id}
              className="hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell>
                {detail.imagenUrl && (
                  <Image
                    src={detail.imagenUrl}
                    width={50}
                    height={50}
                    alt="Imagen"
                    className="rounded text-[10px] bg-muted"
                  />
                )}
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {detail.nombreProducto}
              </TableCell>
              <TableCell>
                <ListItem
                  value={String(detail.cantidad)}
                  color="neutral"
                  hideCurrency
                  className="justify-center"
                />
              </TableCell>
              <TableCell>
                <ListItem value={detail.precioVenta} color="green" />
              </TableCell>
              <TableCell>
                <ListItem value={subtotalVenta} color="neutral" />
              </TableCell>
              <TableCell>
                <ListItem value={ganancia} color="blue" />
              </TableCell>
              <TableCell className="inline-flex gap-1 items-center">
                <EditDetailButton
                  href={`/pedidos/${order.id}/detalle/${detail.id}`}
                />
                <DeleteDetailButton
                  handleDelete={() => handleDelete(detail.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="bg-muted">
        <TableRow>
          <TableCell>
            <Badge variant="outline">{order.detail.length}</Badge>
          </TableCell>
          <TableCell>Total</TableCell>
          <TableCell className="text-center">
            <ListItem
              value={String(formTotals.quantity)}
              color="neutral"
              hideCurrency
              className="justify-center"
            />
          </TableCell>
          <TableCell>
            <ListItem
              value="-"
              color="green"
              hideCurrency
              className="justify-center"
            />
          </TableCell>
          <TableCell>
            <ListItem value={formTotals.totalSell} color="neutral" />
          </TableCell>
          <TableCell>
            <ListItem value={formTotals.profit} color="blue" />
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </TableContainer>
  );
}

function ProductCardEmpty() {
  return (
    <Card>
      <CardContent>
        <span className="block text-xs text-muted-foreground text-center">
          No hay productos en la lista.
        </span>
      </CardContent>
    </Card>
  );
}
