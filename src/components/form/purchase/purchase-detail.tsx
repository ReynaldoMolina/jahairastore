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
import { DetailOptions } from '../detail-options';
import { ProductImageDiv } from '@/components/list/product';

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
              <CardContent className="flex justify-center max-h-25 rounded">
                <ProductImageDiv imagenUrl={detail.imagenUrl} />
              </CardContent>
              <CardHeader>
                <CardTitle>
                  <span>C$ {formatNumber(subtotalCompra)}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {` = ${formatNumber(detail.costo)} x ${detail.cantidad}`}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {detail.nombreProducto}
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
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle className="inline-flex items-baseline gap-1">
              <span>C$ {formatNumber(formTotals.totalCost)}</span>
              <span className="text-xs font-normal text-muted-foreground">
                = Total
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem
              value={String(purchase.detail.length)}
              label="Items"
              color="neutral"
              hideCurrency
            />
            <CardItem
              value={String(formTotals.quantity)}
              label="Cantidad"
              color="neutral"
              hideCurrency
            />
          </CardContent>
        </Card>
      </>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Costo</TableHead>
          <TableHead>Cant</TableHead>
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
              <TableCell>
                <ProductImageDiv imagenUrl={detail.imagenUrl} />
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {detail.nombreProducto}
              </TableCell>
              <TableCell>
                <ListItem value={detail.costo} color="red" showPriceInNio />
              </TableCell>
              <TableCell className="text-xs text-center">
                {detail.cantidad}
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
          <TableCell></TableCell>
          <TableCell>Total</TableCell>
          <TableCell className="text-xs text-center">
            {purchase.detail.length}
          </TableCell>
          <TableCell className="text-xs text-center">
            {formTotals.quantity}
          </TableCell>
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
