import { useServerActionFeedback } from '@/hooks/use-server-status';
import { stateDefault } from '@/server-actions/stateMessage';
import {
  ProductSearchData,
  PurchaseById,
  PurchaseDetailType,
  ServerStatus,
} from '@/types/types';
import { useState, useTransition, useEffect } from 'react';
import { PurchaseDetail } from './purchase-detail';
import { ProductSearch } from '@/components/form-element/product-search';
import ProductSearchList from '@/components/form/purchase/product-search-list';
import {
  createPurchaseDetail,
  deletePurchaseDetail,
} from '@/server-actions/purchase-detail';

interface FormDetail {
  productData: ProductSearchData;
  purchase: PurchaseById;
}

export function FormDetail({ productData, purchase }: FormDetail) {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    PurchaseDetailType[]
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
      const result = await createPurchaseDetail(stateDefault, {
        values: selectedProducts,
      });
      setActionState(result);
    });
  }

  function handleDelete(detailId: number) {
    startTransition(async () => {
      const result = await deletePurchaseDetail(stateDefault, {
        id: detailId,
      });
      setActionState(result);
    });
  }

  function handleCheckedChange(product: PurchaseDetailType) {
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
        idUbicacion={purchase.idUbicacion}
        disableLocationFilter
      >
        <ProductSearchList
          productData={productData}
          purchase={purchase}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleCheckedChange={handleCheckedChange}
        />
      </ProductSearch>
      <PurchaseDetail purchase={purchase} handleDelete={handleDelete} />
    </>
  );
}
