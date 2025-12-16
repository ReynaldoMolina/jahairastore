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
import { formatNumber } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Hash, Trash2 } from 'lucide-react';
import { TableContainer } from '@/components/lists/table';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { EditDetailButton } from '@/components/form-elements/edit-detail-button';
import { DeleteDetailButton } from '@/components/form-elements/delete-detail-button';

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
          const { precioVenta, precioCompra, cambioDolar, cantidad } = detail;
          const subtotalVenta = precioVenta * cambioDolar * cantidad;
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
                    C$ {formatNumber(detail.precioVenta * detail.cambioDolar)}
                  </Badge>
                  <Badge variant="secondary">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <EditDetailButton
                    href={`/ventas/${sale.id}/detalle/${detail.id}`}
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
          <CardContent className="space-y-1">
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
    <TableContainer>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sale.detail.map((detail) => {
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
                  value={detail.precioVenta * detail.cambioDolar}
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
                <div className="flex gap-1 items-center"></div>
                <EditDetailButton
                  href={`/ventas/${sale.id}/detalle/${detail.id}`}
                />
                <DeleteButton handleDelete={() => handleDelete(detail.id)} />
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

interface DeleteButton {
  handleDelete: () => void;
}

function DeleteButton({ handleDelete }: DeleteButton) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-sm" className="size-6">
          <Trash2 className="size-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se va a quitar el producto de la
            lista.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Quitar producto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
