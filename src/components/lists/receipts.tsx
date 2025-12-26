'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '../ui/table';
import { ListItem } from './list-item';
import { Badge } from '../ui/badge';
import { formatDate, formatNumber } from '@/lib/formatters';
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
                <CardHeader className="inline-flex gap-3 px-4">
                  <Avatar>
                    <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                    <AvatarFallback>
                      {register.nombreCliente.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2 overflow-hidden">
                    <CardTitle>{register.nombreCliente}</CardTitle>
                    <CardDescription className="flex gap-2 md:gap-3 items-center">
                      <Badge variant="outline">
                        <Hash />
                        {register.id}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar />
                        {formatDate(register.fecha)}
                      </Badge>
                      <Badge variant="secondary" className={bgColors.green}>
                        $ {formatNumber(register.abono)}
                      </Badge>
                      <Badge variant="outline">
                        <ShoppingBag />
                        {register.idPedido}
                      </Badge>
                    </CardDescription>
                  </div>
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
              <Badge variant="secondary" className={bgColors.green}>
                $ {formatNumber(totals.abono)}
              </Badge>
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
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                      <AvatarFallback>
                        {register.nombreCliente.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{register.nombreCliente}</span>
                  </div>
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
                  <ListItem value={register.abono} color="green" />
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
