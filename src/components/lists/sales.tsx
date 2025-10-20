import { getSales } from '@/fetch-data/data';
import EmptyList from './empty-list';
import {
  List,
  ListCard,
  ListDate,
  ListDetail,
  ListId,
  ListInfo,
  ListInfoDetail,
  ListName,
} from './lists';
import { SaleListHeader } from './list-header';
import { SaleListTotal } from './list-total';
import { Pagination } from './pagination';

export default async function Sales({ searchParams }) {
  const { data, query, totalPages } = await getSales(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <SaleListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/ventas/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID VENTA" />
              <ListName name={register.NombreCliente} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.TotalVenta}
                label="Total venta"
                color="gray"
                nio={true}
              />
              <ListDetail
                detail={register.Saldo || 0}
                label="Saldo"
                color="red"
                nio={true}
                ping={register.Saldo > 0}
              />
              <ListDetail
                detail={register.TotalVenta - register.TotalCompra}
                label="Ganancia"
                color="blue"
                nio={true}
              />
            </ListInfoDetail>
          </ListCard>
        ))}
        <SaleListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
    </>
  );
}
