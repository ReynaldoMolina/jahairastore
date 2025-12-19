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
import { CardItem, ListItem } from '@/components/lists/list-item';
import { Badge } from '@/components/ui/badge';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Hash, MoreHorizontal, Trash2 } from 'lucide-react';
import { TableContainer } from '@/components/lists/table';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EditDetailButton } from '@/components/form-elements/edit-detail-button';
import { DeleteDetailButton } from '@/components/form-elements/delete-detail-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PurchaseDetail {
  purchase: PurchaseById;
  handleDelete: (productId: number) => void;
}

export function PurchaseDetail({ purchase, handleDelete }: PurchaseDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals({ list: purchase.detail, convert: true });

  if (purchase.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {purchase.detail.map((detail) => {
          const { precioVenta, precioCompra, cambioDolar, cantidad } = detail;
          const subtotalVenta = precioVenta * cambioDolar * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

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
                    C$ {formatNumber(detail.precioCompra * detail.cambioDolar)}
                  </Badge>
                  <Badge variant="outline">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <EditDetailButton
                          href={`/compras/${purchase.id}/detalle/${detail.id}`}
                        />
                        <DeleteDetailButton
                          handleDelete={() => handleDelete(detail.id)}
                        />
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardItem
                  value={subtotalCompra}
                  label="Subtotal"
                  color="red"
                  showPriceInNio
                />
                <CardItem
                  value={ganancia}
                  label="Ganancia aprox."
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
              <Badge variant="outline">Conteo: {purchase.detail.length}</Badge>
              <Badge variant="outline">Cantidad: {formTotals.quantity}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={formTotals.totalCost}
              label="Subtotal"
              color="red"
              showPriceInNio
            />
            <CardItem
              value={formTotals.profit}
              label="Ganancia aprox."
              color="blue"
              showPriceInNio
            />
          </CardContent>
        </Card>
      </>
    );

  return (
    <TableContainer>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ganancia aprox.</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {purchase.detail.map((detail) => {
          const { precioVenta, precioCompra, cambioDolar, cantidad } = detail;
          const subtotalVenta = precioVenta * cambioDolar * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

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
                  value={detail.precioCompra * detail.cambioDolar}
                  color="red"
                  showPriceInNio
                />
              </TableCell>
              <TableCell>
                <ListItem
                  value={subtotalCompra}
                  showPriceInNio
                  color="neutral"
                />
              </TableCell>
              <TableCell>
                <ListItem value={ganancia} showPriceInNio color="blue" />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <EditDetailButton
                        href={`/compras/${purchase.id}/detalle/${detail.id}`}
                      />
                      <DeleteDetailButton
                        handleDelete={() => handleDelete(detail.id)}
                      />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="bg-muted">
        <TableRow>
          <TableCell>
            <Badge variant="outline">Conteo: {purchase.detail.length}</Badge>
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
              color="red"
              hideCurrency
              className="justify-center"
            />
          </TableCell>
          <TableCell>
            <ListItem
              value={formTotals.totalCost}
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
