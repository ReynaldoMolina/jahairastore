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
  TableFooter,
} from '../ui/table';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Clients {
  data: {
    id: number;
    nombre: string;
    telefono: string;
    imagenUrl: string;
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
                <CardHeader className="inline-flex gap-3 px-4">
                  <Avatar>
                    <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2">
                    <CardTitle>{register.nombre}</CardTitle>
                    <CardDescription className="inline-flex gap-3 items-center">
                      {/* <Badge className="bg-brand text-black font-normal">
                        {register.id}
                      </Badge> */}
                      <Badge
                        variant="outline"
                        className={
                          register.telefono ? '' : 'text-muted-foreground'
                        }
                      >
                        {register.telefono || 'Sin teléfono'}
                      </Badge>
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
        <Card className="py-4 gap-4 bg-muted">
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription className="inline-flex gap-3 items-center">
              <Badge variant="outline">{data.length}</Badge>
            </CardDescription>
          </CardHeader>
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
            <TableHead>Teléfono</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/clientes/${register.id}`)}
              >
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombre}
                </TableCell>
                <TableCell>{register.telefono}</TableCell>
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
          </TableRow>
        </TableFooter>
      </TableContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
}
