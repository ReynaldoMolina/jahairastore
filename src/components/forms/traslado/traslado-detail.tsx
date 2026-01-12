'use client';

import { TrasladoById } from '@/types/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
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

interface TrasladoDetailProps {
  traslado: TrasladoById;
  handleDelete: (productId: number) => void;
}

export function TrasladoDetail({
  traslado,
  handleDelete,
}: TrasladoDetailProps) {
  const isMobile = useIsMobile();

  if (traslado.detail.length <= 0) return <ProductCardEmpty />;

  if (isMobile)
    return (
      <>
        {traslado.detail.map((detail) => {
          return (
            <Card key={detail.id} className="py-4 gap-4">
              <CardHeader>
                <CardTitle>{detail.nombre}</CardTitle>
                <CardDescription className="inline-flex gap-3">
                  <Badge variant="secondary">Cant: {detail.cantidad}</Badge>
                </CardDescription>
                <CardAction className="inline-flex gap-1 items-center">
                  <DetailOptions
                    path="traslados"
                    registerId={traslado.id}
                    detailId={detail.id}
                    handleDelete={handleDelete}
                  />
                </CardAction>
              </CardHeader>
            </Card>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader>
            <CardTitle>Total: {traslado.detail.length}</CardTitle>
          </CardHeader>
        </Card>
      </>
    );

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Cant</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {traslado.detail.map((detail) => {
          return (
            <TableRow
              key={detail.id}
              className="hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell className="w-full whitespace-normal">
                {detail.nombre}
              </TableCell>
              <TableCell className="text-center text-xs">
                {detail.cantidad}
              </TableCell>
              <TableCell>
                <DetailOptions
                  path="traslados"
                  registerId={traslado.id}
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
            {traslado.detail.length}
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
