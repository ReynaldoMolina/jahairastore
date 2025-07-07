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
  ProductSearchCard,
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
            <ProductSearchCard key={product.Id}>
              <ListInfo>
                <ListId id={product.Id} label="ID PRODUCTO" />
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
            </ProductSearchCard>
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
        {label}:
      </span>
      {children}
    </div>
  );
}
