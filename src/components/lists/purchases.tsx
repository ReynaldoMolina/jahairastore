import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDate,
  ListDetail,
  ListBlankSpace,
} from '@/components/lists/lists';
import EmptyList from '@/components/lists/empty-list';
import { PurchaseListTotal } from './list-total';
import { PurchaseListHeader } from './list-header';
import { PaginationComponent } from './pagination';
import { SearchParamsProps } from '@/types/types';
import { getPurchases } from '@/fetch-data/purchases';

export default async function Purchases({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { data, totalPages } = await getPurchases(searchParams);

  if (data.length === 0) return <EmptyList />;

  return (
    <>
      <List>
        <PurchaseListHeader />
        {data.map((e) => (
          <ListCard key={e.id} href={`/compras/${e.id}`}>
            <ListInfo>
              <ListId id={e.id} label="ID COMPRA" />
              <ListName name={e.proveedor ?? ''} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={e.fecha} />
              <ListDetail
                detail={e.total_compra}
                label="Total compra"
                color="gray"
                nio={true}
              />
              <ListDetail
                detail={e.total_gastos}
                label="Gastos"
                color="red"
                nio={true}
              />
              <ListDetail
                detail={e.ganancia}
                label="Ganancia"
                color="blue"
                nio={true}
              />
            </ListInfoDetail>
          </ListCard>
        ))}
        <PurchaseListTotal data={data} />
      </List>
      <PaginationComponent totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
