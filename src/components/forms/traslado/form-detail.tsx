import { useServerActionFeedback } from '@/hooks/use-server-status';
import { stateDefault } from '@/server-actions/stateMessage';
import {
  TrasladoById,
  ServerStatus,
  TrasladoDetailType,
  ProductSearchTrasladoData,
} from '@/types/types';
import { useState, useTransition, useEffect } from 'react';
import { ProductSearch } from '@/components/form-elements/product-search';
import { TrasladoDetail } from './traslado-detail';
import ProductSearchList from './product-search-list';
import {
  createTrasladoDetail,
  deleteTrasladoDetail,
} from '@/server-actions/traslado-detail';

interface FormDetail {
  productData: ProductSearchTrasladoData;
  traslado: TrasladoById;
}

export function FormDetail({ productData, traslado }: FormDetail) {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    TrasladoDetailType[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ServerStatus | null>(null);

  useServerActionFeedback(actionState, { refresh: true });

  useEffect(() => {
    if (actionState?.success === undefined) return;
    if (actionState.success) {
      setSelectedProducts([]);
      setOpen(false);
    }
  }, [actionState]);

  function handleCreate() {
    startTransition(async () => {
      const result = await createTrasladoDetail(stateDefault, {
        values: selectedProducts,
      });
      setActionState(result);
    });
  }

  function handleDelete(productId: number) {
    startTransition(async () => {
      const result = await deleteTrasladoDetail(stateDefault, {
        id: productId,
      });
      setActionState(result);
    });
  }

  function handleCheckedChange(product: TrasladoDetailType) {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.idProducto === product.idProducto);
      return exists
        ? prev.filter((p) => p.idProducto !== product.idProducto)
        : [...prev, product];
    });
  }

  return (
    <>
      <ProductSearch
        handleAddProducts={handleCreate}
        disableAddButton={selectedProducts.length <= 0}
        isPending={isPending}
        open={open}
        setOpen={setOpen}
        disableLocationFilter
        idUbicacion={traslado.idUbicacionOrigen}
      >
        <ProductSearchList
          productData={productData}
          traslado={traslado}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleCheckedChange={handleCheckedChange}
        />
      </ProductSearch>
      <TrasladoDetail traslado={traslado} handleDelete={handleDelete} />
    </>
  );
}
