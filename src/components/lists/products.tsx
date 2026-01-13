'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '../ui/table';
import EmptyList from './empty-list';
import { ListItem } from './list-item';
import { Pagination } from './pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Hash } from 'lucide-react';
import { formatNumber, roundToPointZeroOrFive } from '@/lib/formatters';
import { bgColors } from '@/lib/bg-colors';
import Image from 'next/image';

interface Products {
  data: {
    id: number;
    nombre: string;
    imagenUrl: string | null;
    codigo: string;
    precioEnCordobas: boolean;
    cambioDolar: number;
    precioCompra: number;
    precioVenta: number;
    gananciaUnidad: number;
    existencias: number;
  }[];
  query: string;
  totalPages: number;
}

export function Products({ data, query, totalPages }: Products) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.existencias += item.existencias;
      return acc;
    },
    {
      existencias: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          const isSoldOut = register.existencias <= 0;

          return (
            <Link key={register.id} href={`/inventario/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader>
                  <CardTitle>{register.nombre}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge variant="outline">
                      <Hash />
                      {register.id}
                    </Badge>
                    <Badge variant="secondary" className={bgColors.green}>
                      {register.precioEnCordobas ? 'C$ ' : '$ '}
                      {register.precioEnCordobas
                        ? formatNumber(
                            roundToPointZeroOrFive(
                              register.precioVenta * register.cambioDolar
                            )
                          )
                        : formatNumber(register.precioVenta)}
                    </Badge>
                    <Badge variant={isSoldOut ? 'destructive' : 'secondary'}>
                      {isSoldOut ? (
                        'Agotado'
                      ) : (
                        <span>Cant: {register.existencias}</span>
                      )}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                {register.imagenUrl && (
                  <CardContent>
                    <div className="flex justify-center max-h-40">
                      <Image
                        src={register.imagenUrl}
                        width={150}
                        height={150}
                        alt="Thumbnail"
                        className="rounded text-xs object-contain"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader>
            <CardTitle>Total: {data.length}</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">Cantidad: {totals.existencias}</Badge>
            </CardDescription>
          </CardHeader>
        </Card>
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead className="w-full">Producto</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            const isSoldOut = register.existencias <= 0;

            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/inventario/${register.id}`)}
              >
                <TableCell>
                  {register.imagenUrl && (
                    <Image
                      src={register.imagenUrl}
                      width={100}
                      height={100}
                      alt="Imagen"
                      className="rounded text-xs object-contain max-h-15"
                    />
                  )}
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombre}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Hash />
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? roundToPointZeroOrFive(
                            register.precioVenta * register.cambioDolar
                          )
                        : register.precioVenta
                    }
                    color="green"
                    showPriceInNio={register.precioEnCordobas}
                  />
                </TableCell>
                <TableCell>
                  {isSoldOut ? (
                    <Badge variant="destructive" className="w-full">
                      Agotado
                    </Badge>
                  ) : (
                    <ListItem
                      value={String(register.existencias)}
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Total</TableCell>
            <TableCell className="text-xs text-center">{data.length}</TableCell>
            <TableCell></TableCell>
            <TableCell className="text-xs text-center">
              <ListItem
                value={String(totals.existencias)}
                color="neutral"
                hideCurrency
                className="justify-center"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
