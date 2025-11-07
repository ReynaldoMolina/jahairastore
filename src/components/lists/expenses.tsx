'use client';

import EmptyList from './empty-list';
import { Pagination } from './pagination';
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
import { CardItem, ListItem } from './list-elements/list-item';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/get-date';

interface Expenses {
  data: {
    id: number;
    idCompra: number;
    nombreProveedor: string;
    fecha: string;
    gasto: number;
    concepto: string;
    cambioDolar: number;
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
                    value={register.concepto}
                    label="Concepto"
                    color="none"
                    hideCurrency
                    className="bg-transparent"
                  />
                  <CardItem
                    value={String(register.idCompra)}
                    label="Id compra"
                    color="neutral"
                    hideCurrency
                  />
                  <CardItem value={register.gasto} label="Gasto" color="red" />
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
            <CardItem value={totals.gasto} label="Gastos" color="red" />
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
            <TableHead>Id compra</TableHead>
            <TableHead>Gasto</TableHead>
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
                    value={String(register.idCompra)}
                    color="neutral"
                    hideCurrency
                  />
                </TableCell>
                <TableCell>
                  <ListItem value={register.gasto} color="red" />
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
              <ListItem value={totals.gasto} color="red" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
