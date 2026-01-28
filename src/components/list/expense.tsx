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
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '../ui/table';
import { CardItem, ListItem } from './list-item';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate, roundToTwoDecimals } from '@/lib/formatters';
import { Calendar, Hash, ShoppingCart } from 'lucide-react';

interface Expenses {
  data: {
    id: number;
    idCompra: number;
    nombreProveedor: string;
    fecha: string;
    gasto: number;
    concepto: string;
    enDolares: boolean;
    cambioDolar: number;
    anulado: boolean;
  }[];
  query: string;
  totalPages: number;
}

export function Expenses({ data, query, totalPages }: Expenses) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.gasto += item.gasto;
      return acc;
    },
    {
      gasto: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/gastos/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="flex flex-col border-b [.border-b]:pb-4">
                  <CardTitle
                    className={
                      register.anulado
                        ? 'text-muted-foreground line-through'
                        : ''
                    }
                  >
                    {register.nombreProveedor}
                  </CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge variant="outline">
                      <Hash />
                      {register.id}
                    </Badge>
                    <Badge variant="outline">
                      <Calendar />
                      {formatDate(register.fecha)}
                    </Badge>
                    <Badge variant="outline">
                      <ShoppingCart />
                      {register.idCompra}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={register.concepto}
                    label="Concepto"
                    color="none"
                    hideCurrency
                    className="bg-transparent"
                  />

                  <CardItem
                    value={
                      register.anulado
                        ? 'Anulado'
                        : register.enDolares
                        ? roundToTwoDecimals(
                            register.gasto / register.cambioDolar
                          )
                        : register.gasto
                    }
                    label="Gasto"
                    color={register.anulado ? 'destructive' : 'red'}
                    hideCurrency={register.anulado}
                    showPriceInNio={!register.enDolares}
                  />
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle>Total: {data.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem
              value={totals.gasto}
              label="Gastos"
              color="red"
              showPriceInNio
            />
          </CardContent>
        </Card>
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Proveedor</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Gasto</TableHead>
            <TableHead>Concepto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/gastos/${register.id}`)}
              >
                <TableCell className="w-full whitespace-normal">
                  {register.nombreProveedor}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="w-full">
                    <Hash />
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="w-full">
                    <ShoppingCart />
                    {register.idCompra}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Calendar />
                    {formatDate(register.fecha)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {register.anulado ? (
                    <Badge variant="destructive" className="w-full">
                      Anulado
                    </Badge>
                  ) : (
                    <ListItem
                      value={
                        register.enDolares
                          ? roundToTwoDecimals(
                              register.gasto / register.cambioDolar
                            )
                          : register.gasto
                      }
                      color="red"
                      showPriceInNio={!register.enDolares}
                    />
                  )}
                </TableCell>
                <TableCell className="max-w-50 truncate overflow-ellipsis text-xs">
                  {register.concepto}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-xs text-center">{data.length}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem value={totals.gasto} color="red" showPriceInNio />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
