import EmptyList from '@/app/ui/lists/EmptyList';
import {
  getProducts,
  getProductsPages,
  getProductsInventario,
  getProductsInventarioPages,
} from '@/app/lib/data';
import {
  ListInfo,
  ListId,
  ListInfoDetail,
  ListDetail,
  ListName,
  List,
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

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ProductSearchListHeader price={price} inventario={inventario} />
        {data.map((product) => {
          const priceToShow = inventario
            ? product[prices[price]] * product.Cambio_dolar
            : product.Precio_venta;

          return (
            <div
              key={product.Id}
              className="flex flex-col md:flex-row items-start p-4 gap-3 hover:bg-sky-100 dark:hover:bg-neutral-800 border-t first-of-type:border-t-0 border-neutral-300 dark:border-neutral-700"
            >
              <ListInfo>
                <ListId id={product.Id} />
                <ListName name={product.Nombre} />
              </ListInfo>
              <ListInfoDetail>
                <ListDetail
                  detail={priceToShow}
                  label="Precio"
                  color={price === 'venta' ? 'green' : 'red'}
                />
                {inventario && (
                  <ListDetail
                    detail={product.Existencias}
                    label="Disponibles"
                    number={false}
                    color="gray"
                  />
                )}
                <CardDetail label="Añadir">
                  <AddProduct product={product} convert={inventario} />
                </CardDetail>
              </ListInfoDetail>
            </div>
          );
        })}
      </List>
      <Pagination totalPages={totalPages} />
    </>
  );
}

function CardDetail({ children, label }) {
  return (
    <div className="flex w-full md:w-auto items-center justify-between gap-1 relative">
      <span className="md:hidden text-neutral-500 dark:text-neutral-400 text-xs w-18">
        {label}
      </span>
      {children}
    </div>
  );
}
