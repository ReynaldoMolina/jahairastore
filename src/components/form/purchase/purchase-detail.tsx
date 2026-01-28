'use client';

import { calculateTotals } from '@/lib/calculate-totals';
import { PurchaseById } from '@/types/types';
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
import { Hash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DetailOptions } from '../detail-options';

interface PurchaseDetail {
  purchase: PurchaseById;
  handleDelete: (productId: number) => void;
}

export function PurchaseDetail({ purchase, handleDelete }: PurchaseDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: purchase.detail });

  if (purchase.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {purchase.detail.map((detail) => {
          const { costo, cantidad } = detail;
          const subtotalCompra = costo * cantidad;

          return (
            <Card key={detail.id} className="py-4 gap-4">
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle>{detail.nombreProducto}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge variant="outline">
                    <Hash />
                    {detail.idProducto}
                  </Badge>
                  <Badge variant="secondary" className={bgColors.red}>
                    C$ {formatNumber(detail.costo)}
                  </Badge>
                  <Badge variant="outline">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <DetailOptions
                    path="compras"
                    registerId={purchase.id}
                    detailId={detail.id}
                    handleDelete={handleDelete}
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardItem
                  value={subtotalCompra}
                  label="Total"
                  color="neutral"
                  showPriceInNio
                />
              </CardContent>
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle>Total: {purchase.detail.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem
              value={String(formTotals.quantity)}
              label="Cantidad"
              color="neutral"
              hideCurrency
            />
            <CardItem
              value={formTotals.totalCost}
              label="Total"
              color="neutral"
              showPriceInNio
            />
          </CardContent>
        </Card>
      </>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead>Costo</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {purchase.detail.map((detail) => {
          const { costo, cantidad } = detail;
          const subtotalCompra = costo * cantidad;

          return (
            <TableRow
              key={detail.id}
              className="hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell className="w-full whitespace-normal">
                {detail.nombreProducto}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <Hash />
                  {detail.idProducto}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-center">
                {detail.cantidad}
              </TableCell>
              <TableCell>
                <ListItem value={detail.costo} color="red" showPriceInNio />
              </TableCell>
              <TableCell>
                <ListItem
                  value={subtotalCompra}
                  showPriceInNio
                  color="neutral"
                />
              </TableCell>
              <TableCell>
                <DetailOptions
                  path="compras"
                  registerId={purchase.id}
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
            {purchase.detail.length}
          </TableCell>
          <TableCell className="text-xs text-center">
            {formTotals.quantity}
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <ListItem
              value={formTotals.totalCost}
              color="neutral"
              showPriceInNio
            />
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
