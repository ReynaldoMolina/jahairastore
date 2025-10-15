import EmptyList from '@/components/lists/empty-list';
import { ProductSearchListHeader } from '@/components/lists/list-header';
import {
  ProductSearchCard,
  ListInfo,
  ListId,
  ListName,
  ListInfoDetail,
  ListDetail,
  List,
} from '@/components/lists/lists';
import { Pagination } from '@/components/lists/pagination';
import { getProducts, getProductsInventario } from '@/fetch-data/data';
import AddProduct from './add-product';

export default async function ProductSearchList({
  searchParams,
  showAll = false,
  inventario = false,
  price = 'venta',
}) {
  const prices = {
    venta: 'Precio_venta',
    compra: 'Precio_compra',
  };

  const { data, query, totalPages } = inventario
    ? await getProductsInventario(searchParams, showAll)
    : await getProducts(searchParams, false, false);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ProductSearchListHeader inventario={inventario} />
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
                  detail={product.Id_shein || '-'}
                  label="Id externo"
                  number={false}
                />
                <ListDetail
                  detail={priceToShow}
                  label="Precio"
                  color={price === 'venta' ? 'green' : 'red'}
                  nio={inventario}
                />
                {inventario && (
                  <ListDetail
                    detail={product.Existencias}
                    label="Disponibles"
                    number={false}
                    color="gray"
                  />
                )}
                <CardDetail label="Seleccionar">
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
