'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import { TableContainer } from './table';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate, formatDateShort } from '@/lib/formatters';
import { Calendar, Check, Clock, Info, X } from 'lucide-react';

interface Tareas {
  data: {
    id: number;
    tarea: string;
    fecha_entrega: string;
    prioridad: string;
    completado: boolean;
  }[];
  query: string;
  totalPages: number;
}

export function Tareas({ data, query, totalPages }: Tareas) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/tareas/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader>
                  <CardTitle
                    className={
                      register.completado
                        ? 'line-through text-muted-foreground'
                        : ''
                    }
                  >
                    {register.tarea}
                  </CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge className="bg-brand text-black font-normal">
                      {register.id}
                    </Badge>
                    <Badge variant="outline">
                      <Calendar />
                      {formatDate(register.fecha_entrega)}
                    </Badge>
                    <Badge variant="outline">
                      <Info />
                      {register.prioridad}
                    </Badge>
                    <Badge
                      variant={register.completado ? 'outline' : 'destructive'}
                      className={
                        register.completado
                          ? 'bg-green-200 dark:bg-green-900'
                          : ''
                      }
                    >
                      {register.completado ? (
                        <>
                          <Check />
                          Completado
                        </>
                      ) : (
                        <>
                          <Clock />
                          Pendiente
                        </>
                      )}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <TableContainer>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="w-full">Tarea</TableHead>
            <TableHead>Fecha entrega</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/tareas/${register.id}`)}
              >
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.tarea}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Calendar />
                    {formatDate(register.fecha_entrega)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Info />
                    {register.prioridad}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={register.completado ? 'outline' : 'destructive'}
                    className={
                      register.completado
                        ? 'bg-green-200 dark:bg-green-900'
                        : ''
                    }
                  >
                    {register.completado ? (
                      <>
                        <Check />
                        Completado
                      </>
                    ) : (
                      <>
                        <X />
                        Pendiente
                      </>
                    )}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
