'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { Badge } from '../ui/badge';
import {
  formatDate,
  formatNumber,
  roundToPointZeroOrFive,
} from '@/lib/formatters';
import { Calendar, Hash, ShoppingBag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { bgColors } from '@/lib/bg-colors';

interface Receipts {
  data: {
    id: number;
    idPedido: number;
    fecha: string;
    abono: number;
    nombreCliente: string;
    imagenUrl: string | null;
    cambioDolar: number;
    enCordobas: boolean;
    anulado: boolean;
  }[];
  query: string;
  totalPages: number;
}

export function Receipts({ data, query, totalPages }: Receipts) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.abono += item.abono;
      return acc;
    },
    {
      abono: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/recibos/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="flex flex-col">
                  <CardTitle
                    className={
                      register.anulado
                        ? 'text-muted-foreground line-through'
                        : ''
                    }
                  >
                    {register.nombreCliente}
                  </CardTitle>
                  <CardDescription className="flex gap-2 md:gap-3 items-center">
                    <Badge variant="outline">
                      <Hash />
                      {register.id}
                    </Badge>
                    <Badge variant="outline">
                      <Calendar />
                      {formatDate(register.fecha)}
                    </Badge>
                    {register.anulado ? (
                      <Badge variant="destructive">Anulado</Badge>
                    ) : (
                      <Badge variant="secondary" className={bgColors.green}>
                        {register.enCordobas ? 'C$' : '$'}{' '}
                        {formatNumber(
                          register.enCordobas
                            ? roundToPointZeroOrFive(
                                register.abono * register.cambioDolar
                              )
                            : register.abono
                        )}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      <ShoppingBag />
                      {register.idPedido}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-2">
            <CardTitle>Total: {data.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardItem label="Abonos" value={totals.abono} color="green" />
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
            <TableHead className="w-full">Cliente</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Abono</TableHead>
            <TableHead>Pedido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/recibos/${register.id}`)}
              >
                <TableCell className="w-full whitespace-normal">
                  {register.nombreCliente}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="w-full">
                    <Hash />
                    {register.id}
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
                        register.enCordobas
                          ? roundToPointZeroOrFive(
                              register.abono * register.cambioDolar
                            )
                          : register.abono
                      }
                      color="green"
                      showPriceInNio={register.enCordobas}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <ShoppingBag />
                    {register.idPedido}
                  </Badge>
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
            <TableCell>
              <ListItem value={totals.abono} color="green" />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
