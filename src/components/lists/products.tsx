'use client';

import { TableContainer } from './table';
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
} from '../ui/table';
import EmptyList from './empty-list';
import { ListItem } from './list-item';
import { Pagination } from './pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Hash, PackageCheck } from 'lucide-react';
import { formatNumber, roundToPointZeroOrFive } from '@/lib/formatters';
import { bgColors } from '@/lib/bg-colors';

interface Products {
  data: {
    id: number;
    nombre: string;
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
            <Link key={register.id} href={`/productos/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader
                // className={!isSoldOut ? 'border-b [.border-b]:pb-4' : ''}
                >
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
                        <>
                          <PackageCheck />
                          Disp: {register.existencias}
                        </>
                      )}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">Conteo: {data.length}</Badge>
              <Badge variant="outline">Disponibles: {totals.existencias}</Badge>
            </CardDescription>
          </CardHeader>
        </Card>
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <TableContainer>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-full">Producto</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Disponibles</TableHead>
            {/* <TableHead>Ganancia disp.</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            const isSoldOut = register.existencias <= 0;

            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/productos/${register.id}`)}
              >
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
            <TableCell>
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem
                value={String(totals.existencias)}
                color="neutral"
                hideCurrency
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
