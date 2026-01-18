'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import EmptyList from './empty-list';
import { Pagination } from './pagination';
import Link from 'next/link';
import { formatNumber, roundToPointZeroOrFive } from '@/lib/formatters';
import Image from 'next/image';
import { Grid } from './grid';
import { cn } from '@/lib/utils';
import { Hash, ImageIcon, ScanBarcode } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Products {
  data: {
    id: number;
    nombre: string;
    imagenUrl: string | null;
    codigo: string;
    precioEnCordobas: boolean;
    cambioDolar: number;
    precioCompra: number;
    precioVenta: number;
    gananciaUnidad: number;
    existencias: number;
  }[];
  query: string;
  totalPages: number;
}

export function Products({ data, query, totalPages }: Products) {
  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <Grid>
        {data.map((register) => {
          const isSoldOut = register.existencias <= 0;

          return (
            <Link
              key={register.id}
              href={`/inventario/${register.id}`}
              scroll={false}
            >
              <Card className="h-full">
                <CardContent className="flex justify-center max-h-50 sm:max-h-40 rounded">
                  {register.imagenUrl ? (
                    <Image
                      src={register.imagenUrl}
                      width={150}
                      height={150}
                      alt="Thumbnail"
                      className="p-1 rounded w-full dark:bg-white text-xs object-contain"
                    />
                  ) : (
                    <div className="flex justify-center items-center aspect-square w-full bg-muted rounded">
                      <ImageIcon className="text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
                <CardHeader className="flex-1">
                  <CardTitle className="text-xs line-clamp-2">
                    {register.nombre}
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-2">
                    <div className="inline-flex gap-1 overflow-auto items-center">
                      <span className="text-xs">
                        {register.precioEnCordobas ? 'C$ ' : '$ '}
                        {register.precioEnCordobas
                          ? formatNumber(
                              roundToPointZeroOrFive(
                                register.precioVenta * register.cambioDolar
                              )
                            )
                          : formatNumber(register.precioVenta)}
                      </span>
                      <Badge variant="outline" className="ml-auto">
                        <Hash />
                        {register.id}
                      </Badge>
                      {register.codigo && (
                        <Badge variant="outline">
                          <ScanBarcode />
                        </Badge>
                      )}
                    </div>
                    <span
                      className={cn(
                        isSoldOut ? 'text-destructive' : '',
                        'text-xs'
                      )}
                    >
                      {isSoldOut ? 'Agotado' : `Stock: ${register.existencias}`}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </Grid>
      <Pagination totalPages={totalPages} />
    </>
  );
}
