import { InventoryListTotal } from './list-total';
import { InventoryListHeader } from './list-header';
import EmptyList from './empty-list';
import {
  List,
  ListCard,
  ListDetail,
  ListId,
  ListInfo,
  ListInfoDetail,
  ListName,
} from './lists';
import { Pagination } from './pagination';
import { SearchParamsProps } from '@/types/types';
import { getInventory } from '@/fetch-data/data';

export async function Inventory({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { data, query, totalPages } = await getInventory(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <InventoryListHeader />
      {data.map((register) => (
        <ListCard href={`/productos/${register.Id}`} key={register.Id}>
          <ListInfo>
            <ListId id={register.Id} />
            <ListName name={register.Nombre} />
          </ListInfo>
          <ListInfoDetail>
            <ListDetail
              detail={register.Id_shein || '-'}
              label="Id externo"
              number={false}
            />
            <ListDetail
              detail={register.Existencias}
              label="Disponibles"
              color="gray"
              number={false}
            />
            <ListDetail
              detail={register.Precio_venta}
              label="Precio"
              color="green"
              nio={true}
            />
            <ListDetail
              detail={register.Ganancia}
              label="Ganancia"
              color="blue"
              nio={true}
            />
          </ListInfoDetail>
        </ListCard>
      ))}
      <InventoryListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}
