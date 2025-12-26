'use client';

import { calculateTotals } from '@/lib/calculate-totals';
import { SaleById } from '@/types/types';
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
import { formatNumber, roundToPointZeroOrFive } from '@/lib/formatters';
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

interface SaleDetail {
  sale: SaleById;
  handleDelete: (productId: number) => void;
}

export function SaleDetail({ sale, handleDelete }: SaleDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: sale.detail, convert: true });

  if (sale.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {sale.detail.map((detail) => {
          const {
            precioVenta,
            precioVentaPorMayor,
            precioCompra,
            cambioDolar,
            cantidad,
            precioPorMayor,
          } = detail;
          const subtotalVenta =
            (precioPorMayor
              ? roundToPointZeroOrFive(precioVentaPorMayor * cambioDolar)
              : roundToPointZeroOrFive(precioVenta * cambioDolar)) * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <Card key={detail.id} className="py-4 gap-4">
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle>{detail.nombre}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge variant="outline">
                    <Hash />
                    {detail.idProducto}
                  </Badge>
                  <Badge variant="secondary" className={`${bgColors.green}`}>
                    C${' '}
                    {formatNumber(
                      precioPorMayor
                        ? roundToPointZeroOrFive(
                            detail.precioVentaPorMayor * detail.cambioDolar
                          )
                        : roundToPointZeroOrFive(
                            detail.precioVenta * detail.cambioDolar
                          )
                    )}
                  </Badge>
                  <Badge variant="secondary">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <DetailOptions
                    path="ventas"
                    registerId={sale.id}
                    detailId={detail.id}
                    handleDelete={handleDelete}
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardItem
                  value={subtotalVenta}
                  label="Subtotal"
                  color="green"
                  showPriceInNio
                />
                <CardItem
                  value={ganancia}
                  label="Ganancia"
                  color="blue"
                  showPriceInNio
                />
              </CardContent>
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3">
              <Badge variant="outline">Conteo: {sale.detail.length}</Badge>
              <Badge variant="outline">Cant: {formTotals.quantity}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={formTotals.totalSell}
              label="Subtotal"
              color="green"
              showPriceInNio
            />
            <CardItem
              value={formTotals.profit}
              label="Ganancia"
              color="blue"
              showPriceInNio
            />
          </CardContent>
        </Card>
      </>
    );

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sale.detail.map((detail) => {
          const {
            precioVenta,
            precioVentaPorMayor,
            precioCompra,
            cambioDolar,
            cantidad,
            precioPorMayor,
          } = detail;
          const subtotalVenta =
            (precioPorMayor
              ? roundToPointZeroOrFive(precioVentaPorMayor * cambioDolar)
              : roundToPointZeroOrFive(precioVenta * cambioDolar)) * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <TableRow
              key={detail.id}
              className="hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell className="w-full whitespace-normal">
                {detail.nombre}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <Hash />
                  {detail.idProducto}
                </Badge>
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
                <ListItem
                  value={roundToPointZeroOrFive(
                    detail.precioVenta * detail.cambioDolar
                  )}
                  color="green"
                  showPriceInNio
                />
              </TableCell>
              <TableCell>
                <ListItem
                  value={subtotalVenta}
                  showPriceInNio
                  color="neutral"
                />
              </TableCell>
              <TableCell>
                <ListItem value={ganancia} showPriceInNio color="blue" />
              </TableCell>
              <TableCell>
                <DetailOptions
                  path="ventas"
                  registerId={sale.id}
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
          <TableCell>
            <Badge variant="outline">Conteo: {sale.detail.length}</Badge>
          </TableCell>
          <TableCell></TableCell>
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
            <ListItem
              value={formTotals.totalSell}
              color="neutral"
              showPriceInNio
            />
          </TableCell>
          <TableCell>
            <ListItem value={formTotals.profit} showPriceInNio color="blue" />
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
