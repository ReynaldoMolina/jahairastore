import { getProducts, getProductsPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
  ListDate,
  ListBlankSpace,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { ProductListHeader } from './ListHeader';

export default async function Products({ query, currentPage }) {
  const data = await getProducts(query, currentPage);
  const totalPages = await getProductsPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ProductListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/productos/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} />
              <ListName name={register.Nombre} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.Precio_venta}
                label="Precio venta"
                color="green"
              />
              <ListDetail
                detail={register.Precio_compra}
                label="Precio compra"
                color="red"
              />
              <ListDetail
                detail={register.Ganancia}
                label="Ganancia"
                color="blue"
              />
            </ListInfoDetail>
          </ListCard>
        ))}
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
