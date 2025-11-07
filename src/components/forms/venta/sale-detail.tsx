'use client';

import { calculateTotals2 } from '@/lib/calculate-totals';
import { SaleDetailType } from '@/types/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { CardItem, ListItem } from '@/components/lists/list-elements/list-item';
import { Badge } from '@/components/ui/badge';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TableContainer } from '@/components/tables/table';
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

interface SaleDetail {
  productList: SaleDetailType[];
  handleDelete: (productId: number) => void;
}

export function SaleDetail({ productList, handleDelete }: SaleDetail) {
  const isMobile = useIsMobile();

  const formTotals = calculateTotals2({ list: productList, convert: true });

  if (productList.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {productList.map((product) => {
          const { precioVenta, precioCompra, cambioDolar, cantidad } = product;
          const subtotalVenta = precioVenta * cambioDolar * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <Card key={product.id} className="py-4 gap-4">
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle>{product.nombre}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge className="bg-brand text-black font-normal">
                    {product.id}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`${bgColors.green} font-normal`}
                  >
                    C$ {formatNumber(product.precioVenta * product.cambioDolar)}
                  </Badge>
                </CardDescription>
                <CardAction>
                  <DeleteButton handleDelete={() => handleDelete(product.id)} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardItem
                  value={String(product.cantidad)}
                  label="Cantidad"
                  color="neutral"
                  hideCurrency
                  className="justify-center"
                />
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
              <Badge className="bg-brand text-black">
                Items: {productList.length}
              </Badge>
              <Badge variant="outline">Cantidad: {formTotals.quantity}</Badge>
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
    <TableContainer>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead className="text-center">Id</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ganancia</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {productList.map((product) => {
          const { precioVenta, precioCompra, cambioDolar, cantidad } = product;
          const subtotalVenta = precioVenta * cambioDolar * cantidad;
          const subtotalCompra = precioCompra * cambioDolar * cantidad;
          const ganancia = subtotalVenta - subtotalCompra;

          return (
            <TableRow key={product.id}>
              <TableCell>
                <Badge className="bg-brand text-black font-normal">
                  {product.id}
                </Badge>
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {product.nombre}
              </TableCell>
              <TableCell>
                <ListItem
                  value={String(product.cantidad)}
                  color="neutral"
                  hideCurrency
                  className="justify-center"
                />
              </TableCell>
              <TableCell>
                <ListItem
                  value={product.precioVenta * product.cambioDolar}
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
                <DeleteButton handleDelete={() => handleDelete(product.id)} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="bg-muted">
        <TableRow>
          <TableCell>
            <Badge className="bg-brand text-black font-normal">
              {productList.length}
            </Badge>
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
