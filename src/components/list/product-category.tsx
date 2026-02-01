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

interface Props {
  data: {
    id: number;
    nombre: string;
  }[];
  query: string;
  totalPages: number;
}

export function Categories({ data, query, totalPages }: Props) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link
              key={register.id}
              href={`/categorias/${register.id}`}
              scroll={false}
            >
              <Card className="py-4 gap-4">
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle>{register.nombre}</CardTitle>
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
            <TableHead className="w-full">Categoría</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => (
            <TableRow
              key={register.id}
              className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
              onClick={() =>
                router.push(`/categorias/${register.id}`, { scroll: false })
              }
            >
              <TableCell className="w-full whitespace-normal">
                {register.nombre}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-muted">
          <TableRow>
            <TableCell>Total: {data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
