'use client';

import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { TableContainer } from './table';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { formatNumber, formatDate } from '@/lib/formatters';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { CardItem, ListItem } from './list-item';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Sales({ data, query, totalPages }) {
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
      saldo: 0,
      ganancia: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => (
          <Link key={register.id} href={`/ventas/${register.id}`}>
            <Card className="py-4 gap-4">
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle>{register.nombreCliente}</CardTitle>
                <CardDescription className="inline-flex gap-3 items-center">
                  <Badge className="bg-brand text-black">{register.id}</Badge>
                  <Badge variant="outline">{formatDate(register.fecha)}</Badge>
                  {register.credito ? (
                    <Badge variant="outline">Crédito</Badge>
                  ) : (
                    ''
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CardItem
                  value={register.total}
                  label="Total"
                  color="neutral"
                  showPriceInNio
                />
                <CardItem
                  value={register.saldo}
                  label="Saldo"
                  color="red"
                  showPriceInNio
                  showPing={register.saldo > 0.01}
                />
                <CardItem
                  value={register.ganancia}
                  label="Ganancia"
                  color="blue"
                  showPriceInNio
                />
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={totals.total}
              label="Total"
              color="neutral"
              showPriceInNio
            />
            <CardItem
              value={totals.saldo}
              label="Saldo"
              color="red"
              showPriceInNio
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
            <TableHead>Cliente</TableHead>
            <TableHead></TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => (
            <TableRow
              key={register.id}
              onClick={() => router.push(`/ventas/${register.id}`)}
              className="hover:cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
            >
              <TableCell>
                <Badge className="bg-brand text-black">{register.id}</Badge>
              </TableCell>
              <TableCell className="w-full whitespace-normal">
                {register.nombreCliente}
              </TableCell>
              <TableCell className="inline-flex w-full justify-center">
                {register.credito && <Badge variant="outline">Crédito</Badge>}
              </TableCell>
              <TableCell>{formatDate(register.fecha)}</TableCell>
              <TableCell>
                <ListItem
                  value={formatNumber(register.total)}
                  color="neutral"
                  showPriceInNio
                />
              </TableCell>
              <TableCell>
                <ListItem
                  value={formatNumber(register.saldo)}
                  color="red"
                  showPriceInNio
                  showPing={register.saldo > 0.01}
                />
              </TableCell>
              <TableCell>
                <ListItem
                  value={formatNumber(Number(register.ganancia))}
                  color="blue"
                  showPriceInNio
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell>
              <Badge variant="outline">{data.length}</Badge>
            </TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">
              <ListItem
                value={formatNumber(totals.total)}
                color="neutral"
                showPriceInNio
              />
            </TableCell>
            <TableCell className="text-right">
              <ListItem
                value={formatNumber(totals.saldo)}
                color="red"
                showPriceInNio
              />
            </TableCell>
            <TableCell className="text-right">
              <ListItem
                value={formatNumber(Number(totals.ganancia))}
                color="blue"
                showPriceInNio
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
