import EmptyList from '@/components/list/empty-list';
import { Pagination } from '@/components/list/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProductSearchData, SaleById, SaleDetailType } from '@/types/types';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { formatNumber, roundToPointZeroOrFive } from '@/lib/formatters';
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
import { ChangeQuantity } from './change-quantity';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Hash } from 'lucide-react';
import { ProductImageDiv } from '@/components/list/product';

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
          const price = p.precioEnDolares
            ? roundToPointZeroOrFive(p.precioVenta / p.cambioDolar)
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
              <CardContent className="flex justify-center max-h-30 rounded">
                <ProductImageDiv imagenUrl={p.imagenUrl} />
              </CardContent>
              <CardHeader>
                <CardTitle className="inline-flex justify-between gap-3">
                  <span>
                    {`${p.precioEnDolares ? '$' : 'C$'} ${formatNumber(price)}`}
                  </span>

                  <Badge variant="outline" className="font-normal">
                    <Hash />
                    {p.id}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex flex-col gap-3 text-xs">
                  <span>{p.nombre}</span>
                  <div className="inline-flex gap-3">
                    <Badge
                      variant={isSoldOut ? 'destructive' : 'secondary'}
                      className="font-normal"
                    >
                      {isSoldOut ? (
                        'Agotado'
                      ) : (
                        <span>Stock: {p.existencias}</span>
                      )}
                    </Badge>
                    {isSelected && (
                      <ChangeQuantity
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
                  </div>
                </CardDescription>
                <CardAction>
                  <Checkbox
                    className="size-5 border-muted-foreground"
                    checked={isChecked}
                    disabled={isAlreadyAdded || isSoldOut}
                    onCheckedChange={() =>
                      handleCheckedChange({
                        idVenta: sale.id,
                        idProducto: p.id,
                        precioVenta: p.precioVenta,
                        precioVentaPorMayor: p.precioVentaPorMayor,
                        costo: p.costo,
                        cantidad: 1,
                        cambioDolar: p.cambioDolar,
                        precioPorMayor: false,
                      })
                    }
                  />
                </CardAction>
              </CardHeader>
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
            <TableHead>Imagen</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Disponible</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productData.products.map((product) => {
            const price = product.precioEnDolares
              ? roundToPointZeroOrFive(
                  product.precioVenta / product.cambioDolar
                )
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
                        idVenta: sale.id,
                        idProducto: product.id,
                        precioVenta: product.precioVenta,
                        precioVentaPorMayor: product.precioVentaPorMayor,
                        costo: product.costo,
                        cantidad: 1,
                        cambioDolar: product.cambioDolar,
                        precioEnDolares: false,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <ProductImageDiv imagenUrl={product.imagenUrl} />
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
                  <ListItem
                    value={formatNumber(price)}
                    color="green"
                    showPriceInNio={!product.precioEnDolares}
                  />
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
