import EmptyList from '@/components/list/empty-list';
import { Pagination } from '@/components/list/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ProductSearchTrasladoData,
  TrasladoById,
  TrasladoDetailType,
} from '@/types/types';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListItem } from '@/components/list/list-item';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Hash } from 'lucide-react';
import { ChangeQuantity, ChangeQuantityCard } from './change-quantity';

interface ProductSearchList {
  productData: ProductSearchTrasladoData;
  traslado: TrasladoById;
  selectedProducts: TrasladoDetailType[];
  setSelectedProducts: Dispatch<SetStateAction<TrasladoDetailType[]>>;
  handleCheckedChange: (product: TrasladoDetailType) => void;
}

export default function ProductSearchList({
  productData,
  traslado,
  selectedProducts,
  setSelectedProducts,
  handleCheckedChange,
}: ProductSearchList) {
  const isMobile = useIsMobile();

  const detailIds = useMemo(
    () => traslado.detail.map((d) => d.idProducto),
    [traslado]
  );

  if (productData.products.length === 0)
    return <EmptyList query={productData.query} />;

  if (isMobile)
    return (
      <>
        {productData.products.map((p) => {
          const isAlreadyAdded = detailIds.includes(p.id);
          const isSelected = selectedProducts.some(
            (prod) => prod.idProducto === p.id
          );
          const isSoldOut = p.existencias <= 0;
          const isChecked = isAlreadyAdded || isSelected;

          return (
            <Card
              key={p.id}
              className={`${
                isSelected || isAlreadyAdded
                  ? 'border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50'
                  : ''
              } py-4 gap-4`}
            >
              <CardHeader
                className={isSelected ? 'border-b [.border-b]:pb-4' : ''}
              >
                <CardTitle className={isSoldOut ? 'text-muted-foreground' : ''}>
                  {p.nombre}
                </CardTitle>
                <CardDescription className="inline-flex gap-3 items-center">
                  <Badge
                    variant="outline"
                    className={isSoldOut ? 'text-muted-foreground' : ''}
                  >
                    <Hash />
                    {p.id}
                  </Badge>
                  <Badge variant={isSoldOut ? 'destructive' : 'secondary'}>
                    {isSoldOut ? 'Agotado' : <span>Cant: {p.existencias}</span>}
                  </Badge>
                </CardDescription>
                <CardAction>
                  <Checkbox
                    className="size-5 border-muted-foreground"
                    checked={isChecked}
                    disabled={isAlreadyAdded || isSoldOut}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idTraslado: traslado.id,
                        idProducto: p.id,
                        cantidad: 1,
                      })
                    }
                  />
                </CardAction>
              </CardHeader>
              {isSelected && (
                <CardContent>
                  <ChangeQuantityCard
                    setSelectedProducts={setSelectedProducts}
                    product={{
                      ...p,
                      cantidad:
                        selectedProducts.find(
                          (prod) => prod.idProducto === p.id
                        )?.cantidad || 1,
                    }}
                  />
                </CardContent>
              )}
            </Card>
          );
        })}
        <Pagination totalPages={productData.totalPages} />
      </>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-8">
              <Checkbox disabled />
            </TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productData.products.map((product) => {
            const isAlreadyAdded = detailIds.includes(product.id);
            const isSelected = selectedProducts.some(
              (prod) => prod.idProducto === product.id
            );
            const isSoldOut = product.existencias <= 0;
            const isChecked = isAlreadyAdded || isSelected;

            return (
              <TableRow
                key={product.id}
                className={cn(
                  isSelected || isAlreadyAdded
                    ? 'bg-blue-50 dark:bg-blue-950/50'
                    : '',
                  'hover:bg-brand/30 dark:hover:bg-brand/20'
                )}
              >
                <TableCell>
                  <Checkbox
                    className="border-muted-foreground"
                    checked={isChecked}
                    disabled={isAlreadyAdded || isSoldOut}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idTraslado: traslado.id,
                        idProducto: product.id,
                        cantidad: 1,
                      })
                    }
                  />
                </TableCell>
                <TableCell
                  className={`${
                    isSoldOut ? 'text-muted-foreground' : ''
                  } w-full whitespace-normal`}
                >
                  {product.nombre}
                </TableCell>
                <TableCell>
                  {isSelected && (
                    <ChangeQuantity
                      setSelectedProducts={setSelectedProducts}
                      product={{
                        ...product,
                        cantidad:
                          selectedProducts.find(
                            (prod) => prod.idProducto === product.id
                          )?.cantidad || 1,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={isSoldOut ? 'text-muted-foreground' : ''}
                  >
                    <Hash />
                    {product.id}
                  </Badge>
                </TableCell>
                <TableCell>
                  {product.existencias <= 0 ? (
                    <Badge variant="destructive" className="w-full">
                      Agotado
                    </Badge>
                  ) : (
                    <ListItem
                      value={String(product.existencias)}
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination totalPages={productData.totalPages} />
    </>
  );
}
