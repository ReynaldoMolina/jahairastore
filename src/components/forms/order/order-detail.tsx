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
import { CardItem, ListItem } from '@/components/list/list-item';
import { Badge } from '@/components/ui/badge';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { DetailOptions } from '../detail-options';

interface OrderDetail {
  order: OrderById;
  handleDelete: (productId: number) => void;
}

export function OrderDetail({ order, handleDelete }: OrderDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: order.detail, isOrder: true });

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
                <CardTitle>{detail.nombreProducto}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge variant="secondary" className={`${bgColors.green}`}>
                    $ {formatNumber(detail.precioVenta)}
                  </Badge>
                  <Badge variant="secondary">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <DetailOptions
                    path="pedidos"
                    registerId={order.id}
                    detailId={detail.id}
                    handleDelete={handleDelete}
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardItem value={subtotalVenta} label="Total" color="neutral" />
                <CardItem value={ganancia} label="Ganancia" color="blue" />
                {detail.imagenUrl && (
                  <div className="flex justify-center">
                    <Image
                      src={detail.imagenUrl}
                      width={150}
                      height={150}
                      alt="Thumbnail"
                      className="rounded text-xs bg-muted"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle>Total: {order.detail.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem
              value={String(formTotals.quantity)}
              label="Cantidad"
              color="neutral"
              hideCurrency
            />
            <CardItem
              value={formTotals.totalSell}
              label="Total"
              color="neutral"
            />
            <CardItem value={formTotals.profit} label="Ganancia" color="blue" />
          </CardContent>
        </Card>
      </>
    );

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead></TableHead>
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
                    width={100}
                    height={100}
                    alt="Imagen"
                    className="rounded text-[10px] bg-muted"
                  />
                )}
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {detail.nombreProducto}
              </TableCell>
              <TableCell className="text-center text-xs">
                {detail.cantidad}
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
              <TableCell>
                <DetailOptions
                  path="pedidos"
                  registerId={order.id}
                  detailId={detail.id}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="bg-muted">
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-xs text-center">
            {order.detail.length}
          </TableCell>
          <TableCell className="text-xs text-center">
            {formTotals.quantity}
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <ListItem value={formTotals.totalSell} color="neutral" />
          </TableCell>
          <TableCell>
            <ListItem value={formTotals.profit} color="blue" />
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
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
