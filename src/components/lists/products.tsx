import { getProducts } from '@/fetch-data/data';
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
        <ListCard key={register.Id} href={`/productos/${register.Id}`}>
          <ListInfo>
            <ListId id={register.Id} />
            <ListName name={register.Nombre} />
          </ListInfo>
          <ListInfoDetail>
            {/* <ListDate date={register.Fecha} /> */}
            <ListDetail
              detail={register.Id_shein || '-'}
              label="Id externo"
              number={false}
            />
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
      <Pagination totalPages={totalPages} />
    </List>
  );
}
