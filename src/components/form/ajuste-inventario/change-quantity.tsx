import { Minus, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { ButtonGroup } from '../../ui/button-group';
import { Input } from '../../ui/input';
import {
  AjusteInventarioDetailType,
  ProductSearchTraslado,
} from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

interface ChangeQuantityProps {
  setSelectedProducts: Dispatch<SetStateAction<AjusteInventarioDetailType[]>>;
  selectedProducts: AjusteInventarioDetailType[];
  product: ProductSearchTraslado & { cantidad?: number };
}

export function ChangeQuantityCard({
  setSelectedProducts,
  selectedProducts,
  product,
}: ChangeQuantityProps) {
  return (
    <div className="flex justify-between w-full items-center gap-3">
      <span className="text-muted-foreground text-xs">Ajuste</span>
      <ChangeQuantity
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        product={product}
      />
    </div>
  );
}

export function ChangeQuantity({
  setSelectedProducts,
  selectedProducts,
  product,
}: ChangeQuantityProps) {
  const selectedProduct = selectedProducts.find(
    (p) => p.idProducto === product.id
  );

  const cantidad = selectedProduct?.cantidad ?? 0;

  function handleChange(delta: number) {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.idProducto === product.id
          ? {
              ...p,
              cantidad: (p.cantidad ?? 0) + delta,
            }
          : p
      )
    );
  }

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-sm"
        className="size-6 dark:bg-input"
        onClick={() => handleChange(-1)}
      >
        <Minus className="size-3" />
      </Button>

      <Input
        readOnly
        value={cantidad > 0 ? `+${cantidad}` : cantidad}
        className="h-6 w-13.5 md:w-10 text-center bg-background dark:bg-input text-xs"
      />

      <Button
        variant="outline"
        size="icon-sm"
        className="size-6 dark:bg-input"
        onClick={() => handleChange(1)}
      >
        <Plus className="size-3" />
      </Button>
    </ButtonGroup>
  );
}
