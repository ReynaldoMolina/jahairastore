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

interface SaleDetail {
  sale: SaleById;
  handleDelete: (productId: number) => void;
}

export function SaleDetail({ sale, handleDelete }: SaleDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: sale.detail });

  if (sale.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {sale.detail.map((detail) => {
          const {
            precioVenta,
            precioVentaPorMayor,
            costo,
            cantidad,
            precioPorMayor,
          } = detail;
          const subtotalVenta =
            (precioPorMayor ? precioVentaPorMayor : precioVenta) * cantidad;
          const subtotalCompra = costo * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <Card key={detail.id} className="py-4 gap-4">
              <CardContent className="flex justify-center max-h-30 rounded">
                <ProductImageDiv imagenUrl={detail.imagenUrl} />
              </CardContent>
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle>
                  <span>C$ {formatNumber(subtotalVenta)}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {` = ${formatNumber(
                      precioPorMayor
                        ? detail.precioVentaPorMayor
                        : detail.precioVenta
                    )} x ${detail.cantidad}`}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {detail.nombre}
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
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle className="inline-flex gap-1 items-baseline">
              <span>C$ {formatNumber(formTotals.totalSell)}</span>
              <span className="text-xs font-normal text-muted-foreground">
                = Total
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem
              value={String(sale.detail.length)}
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
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sale.detail.map((detail) => {
          const {
            precioVenta,
            precioVentaPorMayor,
            costo,
            cantidad,
            precioPorMayor,
          } = detail;
          const subtotalVenta =
            (precioPorMayor ? precioVentaPorMayor : precioVenta) * cantidad;
          const subtotalCompra = costo * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <TableRow
              key={detail.id}
              className="hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell>
                <ProductImageDiv imagenUrl={detail.imagenUrl} />
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {detail.nombre}
              </TableCell>
              <TableCell>
                <ListItem
                  value={detail.precioVenta}
                  color="green"
                  showPriceInNio
                />
              </TableCell>
              <TableCell className="text-xs text-center">
                {detail.cantidad}
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
          <TableCell></TableCell>
          <TableCell>Total</TableCell>
          <TableCell className="text-xs text-center">
            {sale.detail.length}
          </TableCell>
          <TableCell className="text-center text-xs">
            {formTotals.quantity}
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
