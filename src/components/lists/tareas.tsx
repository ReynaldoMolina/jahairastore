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
  Table,
  TableFooter,
} from '../ui/table';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/formatters';
import { Calendar, Check, Clock, Hash, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tareas {
  data: {
    id: number;
    tarea: string;
    fecha_entrega: string;
    estado: string;
  }[];
  query: string;
  totalPages: number;
}

export function Tareas({ data, query, totalPages }: Tareas) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  const taskStateConfig = {
    Pendiente: {
      icon: <Clock className="size-7" />,
      bgColor: 'bg-red-200 dark:bg-red-900',
    },
    'En progreso': {
      icon: <Loader />,
      bgColor: 'bg-yellow-200 dark:bg-yellow-900',
    },
    Hecho: {
      icon: <Check />,
      bgColor: 'bg-green-200 dark:bg-green-900',
    },
  };

  if (isMobile)
    return (
      <>
        {data.map((register) => (
          <Link key={register.id} href={`/tareas/${register.id}`}>
            <Card className="py-4 gap-4">
              <CardHeader>
                <CardTitle
                  className={
                    register.estado === 'Hecho'
                      ? 'line-through text-muted-foreground'
                      : ''
                  }
                >
                  {register.tarea}
                </CardTitle>
                <CardDescription className="inline-flex gap-3 items-center">
                  <Badge variant="outline">
                    <Hash />
                    {register.id}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar />
                    {formatDate(register.fecha_entrega)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={taskStateConfig[register.estado].bgColor}
                  >
                    {taskStateConfig[register.estado].icon}
                    {register.estado}
                  </Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        <Pagination totalPages={totalPages} />
      </>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Tarea</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Entrega</TableHead>
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
                <TableCell
                  className={cn(
                    'w-full whitespace-normal',
                    register.estado === 'Hecho'
                      ? 'line-through text-muted-foreground'
                      : ''
                  )}
                >
                  {register.tarea}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Hash />
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <Calendar />
                    {formatDate(register.fecha_entrega)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={taskStateConfig[register.estado].bgColor}
                  >
                    {taskStateConfig[register.estado].icon}
                    {register.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-xs text-center">{data.length}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
