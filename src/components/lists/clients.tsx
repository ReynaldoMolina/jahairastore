'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
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
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Phone } from 'lucide-react';

interface Clients {
  data: {
    id: number;
    nombre: string;
    telefono: string;
  }[];
  query: string;
  totalPages: number;
}

export function Clients({ data, query, totalPages }: Clients) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/clientes/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle>{register.nombre}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge
                      variant="outline"
                      className={
                        register.telefono ? '' : 'text-muted-foreground'
                      }
                    >
                      <Phone />
                      {register.telefono || 'Sin teléfono'}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 bg-muted">
          <CardHeader className="items-center">
            <CardTitle>Total: {data.length}</CardTitle>
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
            <TableHead>Teléfono</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => (
            <TableRow
              key={register.id}
              className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
              onClick={() => router.push(`/clientes/${register.id}`)}
            >
              <TableCell className="w-full whitespace-normal">
                {register.nombre}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={register.telefono ? '' : 'text-muted-foreground'}
                >
                  <Phone />
                  {register.telefono || 'Sin teléfono'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-xs text-center">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
