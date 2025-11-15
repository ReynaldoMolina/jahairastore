'use client';

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
} from '../ui/table';
import EmptyList from './empty-list';
import { CardItem, ListItem } from './list-item';
import { Pagination } from './pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '../ui/badge';

interface Products {
  data: {
    id: number;
    nombre: string;
    idShein: string;
    precioEnCordobas: boolean;
    cambioDolar: number;
    precioCompra: number;
    precioVenta: number;
    ganancia: number;
  }[];
  query: string;
  totalPages: number;
}

export function Products({ data, query, totalPages }: Products) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (data.length === 0) return <EmptyList query={query} />;

  if (isMobile)
    return (
      <>
        {data.map((register) => {
          return (
            <Link key={register.id} href={`/productos/${register.id}`}>
              <Card className="py-4 gap-4">
                <CardHeader className="border-b [.border-b]:pb-4">
                  <CardTitle>{register.nombre}</CardTitle>
                  <CardDescription className="inline-flex gap-3 items-center">
                    <Badge className="bg-brand text-black font-normal">
                      {register.id}
                    </Badge>
                    {register.idShein && (
                      <Badge variant="outline">{register.idShein}</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardItem
                    value={
                      register.precioEnCordobas
                        ? register.precioVenta * register.cambioDolar
                        : register.precioVenta
                    }
                    label="Venta"
                    color="green"
                    showPriceInNio={register.precioEnCordobas}
                  />
                  <CardItem
                    value={
                      register.precioEnCordobas
                        ? register.precioCompra * register.cambioDolar
                        : register.precioCompra
                    }
                    label="Compra"
                    color="red"
                    showPriceInNio={register.precioEnCordobas}
                  />
                  <CardItem
                    value={
                      register.precioEnCordobas
                        ? register.ganancia * register.cambioDolar
                        : register.ganancia
                    }
                    label="Ganancia"
                    color="blue"
                    showPriceInNio={register.precioEnCordobas}
                  />
                </CardContent>
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
            <TableHead className="w-full">Producto</TableHead>
            <TableHead>Id externo</TableHead>
            <TableHead>Venta</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Ganancia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((register) => {
            return (
              <TableRow
                key={register.id}
                className="cursor-pointer hover:bg-brand/30 dark:hover:bg-brand/20"
                onClick={() => router.push(`/productos/${register.id}`)}
              >
                <TableCell>
                  <Badge className="bg-brand text-black font-normal">
                    {register.id}
                  </Badge>
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {register.nombre}
                </TableCell>
                <TableCell>{register.idShein}</TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? register.precioVenta * register.cambioDolar
                        : register.precioVenta
                    }
                    color="green"
                    showPriceInNio={register.precioEnCordobas}
                  />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? register.precioCompra * register.cambioDolar
                        : register.precioCompra
                    }
                    color="red"
                    showPriceInNio={register.precioEnCordobas}
                  />
                </TableCell>
                <TableCell>
                  <ListItem
                    value={
                      register.precioEnCordobas
                        ? register.ganancia * register.cambioDolar
                        : register.ganancia
                    }
                    color="blue"
                    showPriceInNio={register.precioEnCordobas}
                  />
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
