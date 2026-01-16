import { useServerActionFeedback } from '@/hooks/use-server-status';
import { stateDefault } from '@/server-actions/stateMessage';
import {
  ServerStatus,
  ProductSearchTrasladoData,
  AjusteInventarioById,
  AjusteInventarioDetailType,
} from '@/types/types';
import { useState, useTransition, useEffect } from 'react';
import { ProductSearch } from '@/components/form-element/product-search';
import ProductSearchList from './product-search-list';
import {
  createAjusteInvetarioDetail,
  deleteAjusteInventarioDetail,
} from '@/server-actions/ajuste-inventario-detail';
import { AjusteInventarioDetail } from './ajuste-inventario-detail';

interface FormDetail {
  productData: ProductSearchTrasladoData;
  ajuste: AjusteInventarioById;
}

export function FormDetail({ productData, ajuste }: FormDetail) {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    AjusteInventarioDetailType[]
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
      const result = await createAjusteInvetarioDetail(stateDefault, {
        values: selectedProducts,
      });
      setActionState(result);
    });
  }

  function handleDelete(productId: number) {
    startTransition(async () => {
      const result = await deleteAjusteInventarioDetail(stateDefault, {
        id: productId,
      });
      setActionState(result);
    });
  }

  function handleCheckedChange(product: AjusteInventarioDetailType) {
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
        idUbicacion={ajuste.idUbicacion}
      >
        <ProductSearchList
          productData={productData}
          ajuste={ajuste}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleCheckedChange={handleCheckedChange}
        />
      </ProductSearch>
      <AjusteInventarioDetail ajuste={ajuste} handleDelete={handleDelete} />
    </>
  );
}
