'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { formatDate } from '@/lib/formatters';
import { Calendar, Hash, Plane } from 'lucide-react';

interface Orders {
  data: {
    id: number;
    nombreCliente: string;
    fecha: string;
    envio: string;
    total: number;
    saldo: number;
    ganancia: number;
  }[];
  query: string;
  totalPages: number;
}

export function Orders({ data, query, totalPages }: Orders) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.total += item.total;
      acc.saldo += item.saldo;
      acc.ganancia += item.ganancia;
      return acc;
    },
    {
      total: 0,
      abonos: 0,
      saldo: 0,
      ganancia: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/pedidos/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="flex flex-col border-b [.border-b]:pb-4">
                  <CardTitle>{register.nombreCliente}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge variant="outline">
                      <Hash />
                      {register.id}
                    </Badge>
                    <Badge variant="outline">
                      <Calendar />
                      {formatDate(register.fecha)}
                    </Badge>
                    {register.envio === 'aereo' && (
                      <Badge variant="outline" className="h-5">
                        <Plane />
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={register.total}
                    label="Total"
                    color="neutral"
                  />
                  <CardItem
                    value={register.saldo}
                    label="Saldo"
                    color="red"
                    showPing={register.saldo > 0.01}
                  />
                  <CardItem
                    value={register.ganancia}
                    label="Ganancia"
                    color="blue"
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
            <CardItem value={totals.total} label="Total" color="neutral" />
            <CardItem
              value={totals.saldo}
              label="Saldo"
              color="red"
              showPing={totals.saldo > 0.01}
            />
            <CardItem value={totals.ganancia} label="Ganancia" color="blue" />
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
            <TableHead>Total</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/pedidos/${register.id}`)}
              >
                <TableCell className="flex w-full whitespace-normal">
                  <div className="flex items-center gap-3">
                    <span>{register.nombreCliente}</span>
                    {register.envio === 'aereo' && (
                      <Badge variant="outline">
                        <Plane className="h-5" />
                      </Badge>
                    )}
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
                  <ListItem value={register.total} color="neutral" />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={register.saldo}
                    color="red"
                    showPing={register.saldo > 0.01}
                  />
                </TableCell>
                <TableCell>
                  <ListItem value={register.ganancia} color="blue" />
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
              <ListItem value={totals.total} color="neutral" />
            </TableCell>
            <TableCell>
              <ListItem
                value={totals.saldo}
                color="red"
                showPing={totals.saldo > 0.01}
              />
            </TableCell>
            <TableCell>
              <ListItem value={totals.ganancia} color="blue" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
