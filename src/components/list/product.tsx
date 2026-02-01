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
import { Hash, ImageIcon, ScanBarcode } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface Products {
  data: {
    id: number;
    nombre: string;
    imagenUrl: string | null;
    codigo: string;
    precioEnDolares: boolean;
    cambioDolar: number;
    costo: number;
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
                  <ProductImageDiv imagenUrl={register.imagenUrl} />
                </CardContent>
                <CardHeader>
                  <CardTitle className="inline-flex gap-1 items-center">
                    <span>
                      {register.precioEnDolares ? '$ ' : 'C$ '}
                      {register.precioEnDolares
                        ? formatNumber(
                            roundToPointZeroOrFive(
                              register.precioVenta / register.cambioDolar
                            )
                          )
                        : formatNumber(register.precioVenta)}
                    </span>
                    <div className="inline-flex gap-1 ml-auto">
                      {register.codigo && (
                        <Badge variant="outline" className="px-1">
                          <ScanBarcode />
                        </Badge>
                      )}
                      <Badge variant="outline" className="font-normal">
                        <Hash />
                        {register.id}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-2">
                    <span className="text-xs line-clamp-2">
                      {register.nombre}
                    </span>
                    <Badge variant={isSoldOut ? 'destructive' : 'outline'}>
                      {isSoldOut ? 'Agotado' : `Stock: ${register.existencias}`}
                    </Badge>
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

interface ProductImageDivProps {
  imagenUrl: string | null;
}

export function ProductImageDiv({ imagenUrl }: ProductImageDivProps) {
  return (
    <div
      className={cn(
        !imagenUrl && 'bg-muted',
        'flex justify-center items-center aspect-square w-full rounded'
      )}
    >
      {imagenUrl ? (
        <Image
          src={imagenUrl}
          width={150}
          height={150}
          alt="Thumbnail"
          className="rounded h-full w-full dark:bg-white text-xs object-contain"
        />
      ) : (
        <ImageIcon className="text-muted-foreground" />
      )}
    </div>
  );
}
