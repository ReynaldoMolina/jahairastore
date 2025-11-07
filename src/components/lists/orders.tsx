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
import { TableContainer } from '../tables/table';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '../ui/table';
import { CardItem, ListItem } from './list-elements/list-item';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/get-date';

interface Orders {
  data: {
    id: number;
    nombreCliente: string;
    fecha: string;
    total: number;
    abonos: number;
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
      acc.abonos += item.abonos;
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
                    value={register.total}
                    label="Total"
                    color="neutral"
                  />
                  <CardItem
                    value={register.abonos}
                    label="Abonos"
                    color="green"
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
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">{data.length}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem value={totals.total} label="Total" color="neutral" />
            <CardItem value={totals.abonos} label="Abonos" color="green" />
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
      <TableContainer>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="w-full">Cliente</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Abonos</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer"
                onClick={() => router.push(`/pedidos/${register.id}`)}
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
                  <ListItem value={register.total} color="neutral" />
                </TableCell>
                <TableCell>
                  <ListItem value={register.abonos} color="green" />
                </TableCell>
                <TableCell>
                  <ListItem value={register.saldo} color="red" />
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
            <TableCell>
              <Badge variant="outline">{data.length}</Badge>
            </TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem value={totals.total} color="neutral" />
            </TableCell>
            <TableCell>
              <ListItem value={totals.abonos} color="green" />
            </TableCell>
            <TableCell>
              <ListItem value={totals.saldo} color="red" />
            </TableCell>
            <TableCell>
              <ListItem value={totals.ganancia} color="blue" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
