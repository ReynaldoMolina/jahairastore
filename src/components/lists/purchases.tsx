'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
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
import EmptyList from './empty-list';
import { CardItem, ListItem } from './list-item';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/formatters';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, Hash } from 'lucide-react';

interface Purchases {
  data: {
    id: number;
    nombreProveedor: string;
    imagenUrl: string | null;
    fecha: string;
    total: number;
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
      acc.total += item.total;
      acc.gastos += item.gastos;
      acc.ganancia += item.ganancia;
      return acc;
    },
    {
      total: 0,
      gastos: 0,
      ganancia: 0,
    }
  );

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/compras/${register.id}`}>
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
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={register.total + register.gastos}
                    label="Total"
                    color="red"
                    showPriceInNio
                  />
                  <CardItem
                    value={register.ganancia}
                    label="Ganancia aprox."
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
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardItem
              value={totals.total + totals.gastos}
              label="Total"
              color="red"
              showPriceInNio
            />
            <CardItem
              value={totals.ganancia}
              label="Ganancia aprox."
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
            <TableHead className="w-full">Proveedor</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ganancia aprox.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/compras/${register.id}`)}
              >
                <TableCell className="w-full whitespace-normal">
                  <div className="inline-flex items-center gap-3">
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
                  <ListItem
                    value={register.total + register.gastos}
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
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <ListItem
                value={totals.total + totals.gastos}
                color="red"
                showPriceInNio
              />
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
