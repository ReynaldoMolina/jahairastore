import { getProducts } from '@/fetch-data/product';
import EmptyList from './empty-list';
import { ProductListHeader } from './list-header';
import {
  ListCard,
  ListInfo,
  ListId,
  ListName,
  ListInfoDetail,
  ListDetail,
  List,
} from './lists';
import { Pagination } from './pagination';

export default async function Products({ searchParams }) {
  const { data, query, totalPages } = await getProducts(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <ProductListHeader />
      {data.map((register) => (
        <ListCard key={register.id} href={`/productos/${register.id}`}>
          <ListInfo>
            <ListId id={register.id} />
            <ListName name={register.nombre} />
          </ListInfo>
          <ListInfoDetail>
            <ListDetail
              detail={register.idShein || '-'}
              label="Id externo"
              number={false}
            />
            <ListDetail
              detail={register.precioVenta}
              label="Precio venta"
              color="green"
            />
            <ListDetail
              detail={register.precioCompra}
              label="Precio compra"
              color="red"
            />
            <ListDetail
              detail={register.ganancia}
              label="Ganancia"
              color="blue"
            />
          </ListInfoDetail>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}
