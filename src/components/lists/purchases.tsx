'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import { TableContainer } from '../tables/table';
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
import { CardItem, ListItem } from './list-elements/list-item';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/get-date';

interface Purchases {
  data: {
    id: number;
    nombreProveedor: string;
    fecha: string;
    totalCompra: number;
    gastos: number;
    ganancia: number;
  }[];
  query: string;
  totalPages: number;
}

export function Purchases({ data, query, totalPages }: Purchases) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const totals = data.reduce(
    (acc, item) => {
      acc.compra += item.totalCompra;
      acc.gastos += item.gastos;
      acc.ganancia += item.ganancia;
      return acc;
    },
    {
      compra: 0,
      gastos: 0,
      ganancia: 0,
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
                  <CardTitle>{register.nombreProveedor}</CardTitle>
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
                    value={register.totalCompra}
                    label="Total compra"
                    color="neutral"
                    showPriceInNio
                  />
                  <CardItem
                    value={register.gastos}
                    label="Gastos"
                    color="red"
                    showPriceInNio
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
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader className="border-b [.border-b]:pb-4">
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge className="bg-brand text-black font-normal">
                {data.length}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={totals.compra}
              label="Total compra"
              color="neutral"
              showPriceInNio
            />
            <CardItem
              value={totals.gastos}
              label="Gastos"
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
            <TableHead className="w-full">Proveedor</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total compra</TableHead>
            <TableHead>Gastos</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer"
                onClick={() => router.push(`/recibos/${register.id}`)}
              >
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombreProveedor}
                </TableCell>
                <TableCell>{formatDate(register.fecha)}</TableCell>
                <TableCell>
                  <ListItem
                    value={register.totalCompra}
                    color="neutral"
                    showPriceInNio
                  />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={register.gastos}
                    color="red"
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
            <TableCell>
              <Badge className="bg-brand text-black font-normal">
                {data.length}
              </Badge>
            </TableCell>
            <TableCell className="w-full whitespace-normal">Total</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem value={totals.compra} color="neutral" showPriceInNio />
            </TableCell>
            <TableCell>
              <ListItem value={totals.gastos} color="red" showPriceInNio />
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
