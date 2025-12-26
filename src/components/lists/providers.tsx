'use client';

import EmptyList from './empty-list';
import { Pagination } from './pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Phone } from 'lucide-react';

interface Providers {
  data: {
    id: number;
    nombreEmpresa: string;
    imagenUrl: string | null;
    telefono: string;
  }[];
  query: string;
  totalPages: number;
}

export function Providers({ data, query, totalPages }: Providers) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/proveedores/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="inline-flex gap-3 px-4">
                  <Avatar>
                    <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                    <AvatarFallback>
                      {register.nombreEmpresa.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2">
                    <CardTitle>{register.nombreEmpresa}</CardTitle>
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
              <Badge variant="outline">Conteo: {data.length}</Badge>
            </CardDescription>
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
            <TableHead className="w-full">Proveedor</TableHead>
            <TableHead>Teléfono</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/proveedores/${register.id}`)}
              >
                <TableCell className="w-full whitespace-normal">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={register.imagenUrl} alt="@shadcn" />
                      <AvatarFallback>
                        {register.nombreEmpresa.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{register.nombreEmpresa}</span>
                  </div>
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
            );
          })}
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
