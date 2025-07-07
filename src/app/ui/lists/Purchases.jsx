import { getPurchases, getPurchasesPages } from '@/app/lib/data';
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
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { PurchaseListTotal } from './ListTotal';
import { PurchaseListHeader } from './ListHeader';

export default async function Purchases({ query, currentPage }) {
  const data = await getPurchases(query, currentPage);
  const totalPages = await getPurchasesPages(query);

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
