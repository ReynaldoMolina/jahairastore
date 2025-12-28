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
import { formatDate } from '@/lib/formatters';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, Hash, ShoppingCart } from 'lucide-react';

interface Expenses {
  data: {
    id: number;
    idCompra: number;
    nombreProveedor: string;
    imagenUrl: string | null;
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
                <CardHeader className="border-b [.border-b]:pb-4 inline-flex gap-3 px-4">
                  <Avatar>
                    <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                    <AvatarFallback>
                      {register.nombreProveedor.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2">
                    <CardTitle>{register.nombreProveedor}</CardTitle>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={register.concepto}
                    label="Concepto"
                    color="none"
                    hideCurrency
                    className="bg-transparent"
                  />
                  <CardItem value={register.gasto} label="Gasto" color="red" />
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
            <CardItem value={totals.gasto} label="Gastos" color="red" />
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
            <TableHead>Fecha</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Gasto</TableHead>
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
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                      <AvatarFallback>
                        {register.nombreProveedor.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{register.nombreProveedor}</span>
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
                  <Badge variant="outline">
                    <ShoppingCart />
                    {register.idCompra}
                  </Badge>
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
            <TableCell>Total</TableCell>
            <TableCell className="text-xs text-center">{data.length}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem value={totals.gasto} color="red" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
