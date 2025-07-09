import { getInventory, getInventoryPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { InventoryListTotal } from './ListTotal';
import { InventoryListHeader } from './ListHeader';

export default async function Inventory({ searchParams }) {
  const { data, query, totalPages } = await getInventory(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List blankSpaceBottom={false}>
        <InventoryListHeader />
        {data.map((register) => (
          <ListCard href={`/productos/${register.Id}`} key={register.Id}>
            <ListInfo>
              <ListId id={register.Id} label="ID PRODUCTO" />
              <ListName name={register.Nombre} />
            </ListInfo>
            <ListInfoDetail>
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
      </List>
      <Pagination totalPages={totalPages} />
    </>
  );
}
