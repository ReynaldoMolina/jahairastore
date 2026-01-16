import EmptyList from '@/components/list/empty-list';
import { Pagination } from '@/components/list/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  AjusteInventarioById,
  AjusteInventarioDetailType,
  ProductSearchTrasladoData,
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
  ajuste: AjusteInventarioById;
  selectedProducts: AjusteInventarioDetailType[];
  setSelectedProducts: Dispatch<SetStateAction<AjusteInventarioDetailType[]>>;
  handleCheckedChange: (product: AjusteInventarioDetailType) => void;
}

export default function ProductSearchList({
  productData,
  ajuste,
  selectedProducts,
  setSelectedProducts,
  handleCheckedChange,
}: ProductSearchList) {
  const isMobile = useIsMobile();

  const detailIds = useMemo(
    () => ajuste.detail.map((d) => d.idProducto),
    [ajuste]
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

          console.log(p);

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
                <CardTitle>{p.nombre}</CardTitle>
                <CardDescription className="inline-flex gap-3 items-center">
                  <Badge variant="outline">
                    <Hash />
                    {p.id}
                  </Badge>
                  <Badge variant={isSoldOut ? 'destructive' : 'secondary'}>
                    {isSoldOut ? (
                      'Agotado'
                    ) : (
                      <span>Stock: {p.existencias}</span>
                    )}
                  </Badge>
                </CardDescription>
                <CardAction>
                  <Checkbox
                    className="size-5 border-muted-foreground"
                    checked={isChecked}
                    disabled={isAlreadyAdded}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idAjuste: ajuste.id,
                        idProducto: p.id,
                        cantidad: 0,
                      })
                    }
                  />
                </CardAction>
              </CardHeader>
              {isSelected && (
                <CardContent>
                  <ChangeQuantityCard
                    selectedProducts={selectedProducts}
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
            <TableHead>Ajuste</TableHead>
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
                    disabled={isAlreadyAdded}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idAjuste: ajuste.id,
                        idProducto: product.id,
                        cantidad: 0,
                      })
                    }
                  />
                </TableCell>
                <TableCell className="w-full whitespace-normal">
                  {product.nombre}
                </TableCell>
                <TableCell>
                  {isSelected && (
                    <ChangeQuantity
                      selectedProducts={selectedProducts}
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
                  <Badge variant="outline">
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
