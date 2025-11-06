'use client';

import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { CardItem, ListItem } from './list-elements/list-item';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { TableContainer } from '../tables/table';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';

interface Inventory {
  data: {
    id: number;
    nombre: string;
    precioVenta: number;
    precioCompra: number;
    cambioDolar: number;
    existencias: number;
    ganancia: number;
  }[];
  query: string;
  totalPages: number;
}

export function Inventory({ data, query, totalPages }: Inventory) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.existencias += Number(item.existencias);
      acc.ganancia += item.ganancia;
      return acc;
    },
    {
      existencias: 0,
      ganancia: 0,
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
                <CardHeader className="border-b [.border-b]:pb-4">
                  <CardTitle>{register.nombre}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge className="bg-brand text-black font-normal">
                      {register.id}
                    </Badge>
                    <Badge variant="secondary" className={bgColors.green}>
                      C$ {formatNumber(register.precioVenta)}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSoldOut ? (
                    <div className="inline-flex w-full justify-between">
                      <span className="text-xs text-muted-foreground">
                        Disponibles
                      </span>
                      <Badge variant="destructive" className="min-w-25">
                        Agotado
                      </Badge>
                    </div>
                  ) : (
                    <CardItem
                      value={register.existencias}
                      label="Disponibles"
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                  <CardItem
                    value={register.ganancia}
                    label="Ganancia"
                    color="blue"
                    showPriceInNio
                  />
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={String(totals.existencias)}
              label="Disponibles"
              color="neutral"
              hideCurrency
              className="justify-center"
            />
            <CardItem
              value={totals.ganancia}
              label="Ganancia"
              color="blue"
              showPriceInNio
            />
          </CardContent>
        </Card>
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <TableContainer>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Disponibles</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            const isSoldOut = register.existencias <= 0;

            return (
              <TableRow
                key={register.id}
                className="cursor-pointer"
                onClick={() => router.push(`/productos/${register.id}`)}
              >
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombre}
                </TableCell>
                <TableCell>
                  {isSoldOut ? (
                    <Badge variant="destructive" className="min-w-25">
                      Agotado
                    </Badge>
                  ) : (
                    <ListItem
                      value={register.existencias}
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <ListItem
                    value={register.precioVenta}
                    color="green"
                    showPriceInNio
                  />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={register.ganancia}
                    color="blue"
                    showPriceInNio
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell className="text-center">
              <Badge variant="outline">{data.length}</Badge>
            </TableCell>
            <TableCell>Total</TableCell>
            <TableCell>
              <ListItem
                value={String(totals.existencias)}
                color="neutral"
                hideCurrency
                className="justify-center"
              />
            </TableCell>
            <TableCell>
              <ListItem value={'-'} color="green" hideCurrency />
            </TableCell>
            <TableCell>
              <ListItem value={totals.ganancia} color="blue" showPriceInNio />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
