import { getPurchases } from '@/fetch-data/data';
import EmptyList from './empty-list';
import { PurchaseListHeader } from './list-header';
import { PurchaseListTotal } from './list-total';
import {
  ListCard,
  ListInfo,
  ListId,
  ListName,
  ListInfoDetail,
  ListDate,
  ListDetail,
  ListBlankSpace,
  List,
} from './lists';
import { Pagination } from './pagination';

export default async function Purchases({ searchParams }) {
  const { data, query, totalPages } = await getPurchases(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <PurchaseListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/compras/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID COMPRA" />
              <ListName name={register.Nombre_empresa} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.TotalCompraCompra}
                label="Total compra"
                color="gray"
                nio={true}
              />
              <ListDetail
                detail={register.TotalGasto}
                label="Gastos"
                color="red"
                nio={true}
              />
              <ListDetail
                detail={
                  register.TotalCompraVenta -
                  register.TotalCompraCompra -
                  register.TotalGasto
                }
                label="Ganancia"
                color="blue"
                nio={true}
              />
            </ListInfoDetail>
          </ListCard>
        ))}
        <PurchaseListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
