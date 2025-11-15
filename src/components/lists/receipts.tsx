'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { CardItem, ListItem } from './list-item';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/formatters';

interface Receipts {
  data: {
    id: number;
    idPedido: number;
    fecha: string;
    abono: number;
    nombreCliente: string;
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
                <CardHeader className="border-b [.border-b]:pb-4">
                  <CardTitle>{register.nombreCliente}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge className="bg-brand text-black font-normal">
                      {register.id}
                    </Badge>
                    <Badge variant="outline">
                      {formatDate(register.fecha)}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={String(register.idPedido)}
                    label="Id pedido"
                    color="neutral"
                    hideCurrency
                  />
                  <CardItem
                    value={register.abono}
                    label="Abono"
                    color="green"
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
              <Badge variant="outline">{data.length}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem value={totals.abono} label="Abonos" color="green" />
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
            <TableHead className="w-full">Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Id pedido</TableHead>
            <TableHead>Abono</TableHead>
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
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombreCliente}
                </TableCell>
                <TableCell>{formatDate(register.fecha)}</TableCell>
                <TableCell>
                  <ListItem
                    value={String(register.idPedido)}
                    color="neutral"
                    hideCurrency
                  />
                </TableCell>
                <TableCell>
                  <ListItem value={register.abono} color="green" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell>
              <Badge variant="outline">{data.length}</Badge>
            </TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem value={totals.abono} color="green" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
