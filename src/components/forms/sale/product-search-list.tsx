import EmptyList from '@/components/lists/empty-list';
import { Pagination } from '@/components/lists/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProductSearchData, SaleById, SaleDetailType } from '@/types/types';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { formatNumber } from '@/lib/formatters';
import { bgColors } from '@/lib/bg-colors';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CardItem, ListItem } from '@/components/lists/list-item';
import { TableContainer } from '@/components/lists/table';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { ChangeQuantityCard, ChangeQuantity } from './change-quantity';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductSearchList {
  productData: ProductSearchData;
  sale: SaleById;
  selectedProducts: SaleDetailType[];
  setSelectedProducts: Dispatch<SetStateAction<SaleDetailType[]>>;
  handleCheckedChange: (product: SaleDetailType) => void;
}

export default function ProductSearchList({
  productData,
  sale,
  selectedProducts,
  setSelectedProducts,
  handleCheckedChange,
}: ProductSearchList) {
  const isMobile = useIsMobile();

  const detailIds = useMemo(() => sale.detail.map((d) => d.idProducto), [sale]);

  if (productData.products.length === 0)
    return <EmptyList query={productData.query} />;

  if (isMobile)
    return (
      <>
        {productData.products.map((p) => {
          const price = p.precioEnCordobas
            ? p.precioVenta * p.cambioDolar
            : p.precioVenta;
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
              <CardHeader className="border-b [.border-b]:pb-4">
                <CardTitle className={isSoldOut ? 'text-muted-foreground' : ''}>
                  {p.nombre}
                </CardTitle>
                <CardDescription className="inline-flex gap-3 items-center">
                  <Badge
                    className={
                      isSoldOut
                        ? 'bg-brand/50 text-muted-foreground dark:text-black'
                        : 'bg-brand text-black'
                    }
                  >
                    {p.id}
                  </Badge>
                  <Badge variant="secondary" className={bgColors.green}>
                    {`${p.precioEnCordobas ? 'C$' : '$'} ${formatNumber(
                      price
                    )}`}
                  </Badge>
                </CardDescription>
                <CardAction>
                  <Checkbox
                    className="size-5 border-muted-foreground"
                    checked={isChecked}
                    disabled={isAlreadyAdded || isSoldOut}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idProducto: p.id,
                        precioVenta: p.precioVenta,
                        precioCompra: p.precioCompra,
                        cantidad: 1,
                        cambioDolar: p.cambioDolar,
                        idVenta: sale.id,
                      })
                    }
                  />
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-1">
                {isSoldOut ? (
                  <div className="inline-flex w-full justify-between">
                    <span className="text-xs text-muted-foreground">
                      Disponibles
                    </span>
                    <Badge variant="destructive" className="min-w-25">
                      Agotado
                    </Badge>
                  </div>
                ) : (
                  <CardItem
                    value={String(p.existencias)}
                    label="Disponibles"
                    color="neutral"
                    hideCurrency
                    className="justify-center"
                  />
                )}
                {isSelected && (
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
                )}
              </CardContent>
            </Card>
          );
        })}
        <Pagination totalPages={productData.totalPages} />
      </>
    );

  return (
    <>
      <TableContainer>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">
              <Checkbox disabled />
            </TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Disponibles</TableHead>
            <TableHead>Precio</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productData.products.map((product) => {
            const price = product.precioEnCordobas
              ? product.precioVenta * product.cambioDolar
              : product.precioVenta;
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
                        idProducto: product.id,
                        precioVenta: product.precioVenta,
                        precioCompra: product.precioCompra,
                        cantidad: 1,
                        cambioDolar: product.cambioDolar,
                        idVenta: sale.id,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      isSoldOut
                        ? 'bg-brand/50 text-muted-foreground dark:text-black'
                        : 'bg-brand text-black'
                    }
                  >
                    {product.id}
                  </Badge>
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
                  {product.existencias <= 0 ? (
                    <Badge variant="destructive">Agotado</Badge>
                  ) : (
                    <ListItem
                      value={String(product.existencias)}
                      color="neutral"
                      hideCurrency
                      className="justify-center"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <ListItem
                    value={formatNumber(price)}
                    color="green"
                    showPriceInNio={product.precioEnCordobas}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
      <Pagination totalPages={productData.totalPages} />
    </>
  );
}
