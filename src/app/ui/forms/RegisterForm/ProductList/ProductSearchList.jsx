import EmptyList from '@/app/ui/lists/EmptyList';
import {
  getProducts,
  getProductsPages,
  getProductsInventario,
  getProductsInventarioPages,
} from '@/app/lib/data';
import {
  ListCard,
  ListInfo,
  ListId,
  ListInfoDetail,
  ListDetail,
  ListName,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import AddProduct from './AddProduct';
import { ProductSearchListHeader } from '@/app/ui/lists/ListHeader';

export default async function ProductSearchList({
  searchParams,
  inventario = false,
  price = 'venta',
}) {
  const prices = {
    venta: 'Precio_venta',
    compra: 'Precio_compra',
  };

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = inventario
    ? await getProductsInventarioPages(query)
    : await getProductsPages(query, false, false);

  const data = inventario
    ? await getProductsInventario(query, currentPage)
    : await getProducts(query, currentPage, false, false);

  return (
    <div className={`flex flex-col gap-1 rounded-xl`}>
      {data.length !== 0 && (
        <ProductSearchListHeader price={price} inventario={inventario} />
      )}
      {data.length === 0 && <EmptyList query={query} />}
      {data.map((product) => {
        const priceToShow = inventario
          ? product[prices[price]] * product.Cambio_dolar
          : product.Precio_venta;

        return (
          <div
            key={product.Id}
            className="flex rounded-lg items-center bg-white dark:bg-neutral-900 px-2 py-3 md:px-2 md:py-2 shadow-sm gap-2 hover:bg-sky-100 dark:hover:bg-neutral-800"
          >
            <ListId id={product.Id} />
            <ListInfo>
              <ListName name={product.Nombre} />
              <ListInfoDetail>
                <ListDetail
                  detail={priceToShow}
                  color={price === 'venta' ? 'green' : 'red'}
                />
                {inventario && (
                  <ListDetail detail={product.Existencias} type="text" />
                )}
              </ListInfoDetail>
            </ListInfo>
            <AddProduct product={product} convert={inventario} />
          </div>
        );
      })}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
