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
import { CardItem, ListItem } from './list-item';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { TableContainer } from './table';
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
    precioEnCordobas: boolean;
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
      acc.ganancia += item.ganancia * item.cambioDolar;
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
                  <CardTitle
                    className={isSoldOut ? 'text-muted-foreground' : ''}
                  >
                    {register.nombre}
                  </CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge
                      className={`${
                        isSoldOut ? 'bg-brand/50' : 'bg-brand'
                      } text-black`}
                    >
                      {register.id}
                    </Badge>
                    <Badge variant="secondary" className={bgColors.green}>
                      {register.precioEnCordobas
                        ? `C$ ${formatNumber(
                            register.precioVenta * register.cambioDolar
                          )}`
                        : `$ ${formatNumber(register.precioVenta)}`}
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
                      value={String(register.existencias)}
                      label="Disponibles"
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                  <CardItem
                    value={
                      register.precioEnCordobas
                        ? register.ganancia * register.cambioDolar
                        : register.ganancia
                    }
                    label="Ganancia"
                    color="blue"
                    showPriceInNio={register.precioEnCordobas}
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
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/productos/${register.id}`)}
              >
                <TableCell>
                  <Badge
                    className={`${
                      isSoldOut ? 'bg-brand/50' : 'bg-brand'
                    } text-black`}
                  >
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`${
                    isSoldOut ? 'text-muted-foreground' : ''
                  } w-full whitespace-normal`}
                >
                  {register.nombre}
                </TableCell>
                <TableCell>
                  {isSoldOut ? (
                    <Badge variant="destructive">Agotado</Badge>
                  ) : (
                    <ListItem
                      value={String(register.existencias)}
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? register.precioVenta * register.cambioDolar
                        : register.precioVenta
                    }
                    color="green"
                    showPriceInNio={register.precioEnCordobas}
                  />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? register.ganancia * register.cambioDolar
                        : register.ganancia
                    }
                    color="blue"
                    showPriceInNio={register.precioEnCordobas}
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
