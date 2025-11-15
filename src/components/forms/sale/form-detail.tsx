import { useServerActionFeedback } from '@/hooks/use-server-status';
import {
  createSaleDetail,
  deleteSaleDetail,
} from '@/server-actions/sale-detail';
import { stateDefault } from '@/server-actions/stateMessage';
import {
  ProductSearchData,
  SaleById,
  SaleDetailType,
  ServerStatus,
} from '@/types/types';
import { useState, useTransition, useEffect } from 'react';
import { SaleDetail } from './sale-detail';
import { ProductSearch } from '@/components/form-elements/product-search';
import ProductSearchList from './product-search-list';

interface FormDetail {
  productData: ProductSearchData;
  sale: SaleById;
}

export function FormDetail({ productData, sale }: FormDetail) {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SaleDetailType[]>(
    []
  );
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
      const result = await createSaleDetail(stateDefault, {
        values: selectedProducts,
      });
      setActionState(result);
    });
  }

  function handleDelete(productId: number) {
    startTransition(async () => {
      const result = await deleteSaleDetail(stateDefault, { id: productId });
      setActionState(result);
    });
  }

  function handleCheckedChange(product: SaleDetailType) {
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
      >
        <ProductSearchList
          productData={productData}
          sale={sale}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleCheckedChange={handleCheckedChange}
        />
      </ProductSearch>
      <SaleDetail sale={sale} handleDelete={handleDelete} />
    </>
  );
}
