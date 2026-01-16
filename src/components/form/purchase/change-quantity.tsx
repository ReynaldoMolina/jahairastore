import { Minus, Plus } from 'lucide-react';
import { ProductSearchProduct, PurchaseDetailType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChangeQuantityProps {
  setSelectedProducts: Dispatch<SetStateAction<PurchaseDetailType[]>>;
  product: ProductSearchProduct & { cantidad?: number };
}

export function ChangeQuantityCard({
  setSelectedProducts,
  product,
}: ChangeQuantityProps) {
  return (
    <div className="flex justify-between w-full items-center gap-3">
      <span className="text-muted-foreground text-xs">Cantidad</span>
      <ChangeQuantity
        setSelectedProducts={setSelectedProducts}
        product={product}
      />
    </div>
  );
}

export function ChangeQuantity({
  setSelectedProducts,
  product,
}: ChangeQuantityProps) {
  const cantidad = product.cantidad ?? 1;

  function handleChange(delta: number) {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.idProducto === product.id
          ? {
              ...p,
              cantidad: Math.max(1, p.cantidad + delta),
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
        className="size-6 rounded-full"
        onClick={() => handleChange(-1)}
        disabled={cantidad <= 1}
      >
        <Minus className="size-3" />
      </Button>

      <Input
        readOnly
        value={cantidad}
        className="h-6 w-13.5 md:w-10 text-center bg-background text-xs"
      />

      <Button
        variant="outline"
        size="icon-sm"
        className="size-6 rounded-full"
        onClick={() => handleChange(1)}
      >
        <Plus className="size-3" />
      </Button>
    </ButtonGroup>
  );
}
